from py2neo import Graph, Subgraph
import json
import os

def get_json_data(cypher_ql):
    neo4j_host = os.environ.get("NEO4J_URL", "neo4j+s://demo.neo4jlabs.com")
    neo4j_user = os.environ.get("NEO4J_USER", "companies")
    neo4j_password = os.environ.get("NEO4J_PASS", "companies")
    graph = Graph(neo4j_host, auth=(neo4j_user, neo4j_password))
    result = graph.run(cypher_ql)

    subgraph =result.to_subgraph()
    node_ids = []
    source_nodes = subgraph.nodes
    for node in subgraph.nodes:
        node_ids.append(node.identity)

    result = graph.run("MATCH (n)-[r]-(m) WHERE ID(n) IN $node_ids AND ID(m) IN $node_ids RETURN n, r, m", node_ids=node_ids)
    subgraph = result.to_subgraph()
    nodes = []
    relationships = []

    if subgraph:
        for node in subgraph.nodes:
            properties = {k: v for k, v in dict(node).items() if not callable(v)}
            nodes.append({
                "id": node.identity,
                "labels": list(node.labels),
                "properties": properties,
            })
    else:
        for node in source_nodes:
            properties = {k: v for k, v in dict(node).items() if not callable(v)}
            nodes.append({
                "id": node.identity,
                "labels": list(node.labels),
                "properties": properties,
            })

    if subgraph:
        for relationship in subgraph.relationships:
            properties = {k: v for k, v in dict(relationship).items() if not callable(v)}
            relationships.append({
                "id": relationship.identity,
                "type": type(relationship).__name__,
                "start_node": relationship.start_node.identity,
                "end_node": relationship.end_node.identity,
                "properties": properties,
            })

    # 构建包含节点和关系的字典
    data = {
        "nodes": nodes,
        "relationships": relationships,
    }

    # 转换为 JSON 字符串
    # json_data = json.dumps(data, indent=4, ensure_ascii=False)

    return data