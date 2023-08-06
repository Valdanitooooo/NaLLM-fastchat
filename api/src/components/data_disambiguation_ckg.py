import json
import re
from itertools import groupby

from components.base_component import BaseComponent
from utils.unstructured_data_utils import (
    nodesTextToListOfDict,
    relationshipTextToListOfDict,
)


def generate_system_message_for_nodes() -> str:
    return """Your task is to identify if there are duplicated nodes and if so merge them into one nod. Only merge the nodes that refer to the same entity.
You will be given different datasets of nodes and some of these nodes may be duplicated or refer to the same entity. 
The datasets contains nodes in the form [ENTITY_ID, TYPE, PROPERTIES]. When you have completed your task please give me the 
resulting nodes in the same format. Only return the nodes and relationships no other text. If there is no duplicated nodes return the original nodes.

Here is an example of the input you will be given:
["遗传性补体缺陷病", "Disease", {"identity":3882,"labels":["Disease"],"properties":{"prevent":"本病是遗传性疾病，目前尚无有效预防措施，早发现早治疗是本病防治的关键。","cure_way":["药物治疗","支持性治疗"],"name":"遗传性补体缺陷病","cure_lasttime":"3个月","cured_prob":"40%","cause":"大多数补体遗传缺陷属常染色体隐性遗传，少数为常染色体显性遗传，而备解素缺陷则属X染色体连锁隐性遗传。","cure_department":["内科","风湿免疫科"],"desc":" 在补体系统的组成成分中，几乎每一种可有遗传缺陷。大多数补体遗传缺陷属常染色体隐性遗传，少数为常染色体显性遗传，而备解素缺陷则属X染色体连锁隐性遗传。补体缺乏常伴发免疫性疾病及反复细菌感染。总的来说，补体系统的第一前端反应成分，如C1、C4和C2缺陷，常伴有免疫复合物性疾病，尤其是SLE;C3、H因子和I因子缺乏增加了患者对化脓性细菌感染的易感性，而备解素、C5、C6，C7和C8缺陷的患者则易于发生严重的萘瑟菌感染。","easy_get":"无特殊人群"}}], ["Ⅰ型超敏反应性疾病", "Disease", {"identity":3886,"labels":["Disease"],"properties":{"prevent":"自身免疫是一个复杂的，多因素效应的自然现象，除外界影响(如药物半抗原，微生物感染)外，还与机体自身的遗传因素密切相关，特别是可能与主要组织相容性系统中的免疫应答基因和(或)免疫抑制基因的异常有关，故在预防方面最主要是避免接触过敏源。","cure_way":["药物治疗","支持性治疗"],"name":"Ⅰ型超敏反应性疾病","cured_prob":"治愈率99%","cure_lasttime":"治疗周期7天","cause":"致敏原的种类繁多，常见的有①异种蛋白质：如异种动物血清、蜂毒、昆虫毒液、疫苗、寄生虫、食物、花粉、胰岛素等;②药物：如各种抗生素、有机碘、汞剂等。患特应性疾病(包括特应性皮炎)有着遗传素质，患者对吸入或摄入的物质(过敏原)产生由 IgE抗体介导的超敏反应，而这些物质对无特应性疾病的人是无害的，除特应性皮炎外，通常IgE抗体会介导超敏反应，在婴幼儿虽然特性皮炎的症状是由 IgE介导的食物过敏所致，然而在大龄儿童和成年人皮炎症状很大程度上与过敏因素无关，尽管大多数病人仍保持有特异的过敏性。","cure_department":["内科","风湿免疫科"],"easy_get":"无特殊人群","desc":"与Ⅰ型超敏反应有关的疾病包括特应性疾病：变应性鼻炎，过敏性结膜炎、特应性皮炎和过敏性哮喘、外源性和一些荨麻疹、胃肠道食物反应和全身性过敏反应，哮喘的病因虽然还未阐明，其发病率明显增加。近年来已注意到Ⅰ型超敏反应明显的增加与接触胶乳物品的溶于水的蛋白有关(如橡皮手套、牙托，避孕套、呼吸器材的管道、导管，灌肠尖端膨胀的胶乳套)，特别见于接触胶乳的医护人员和病人，以及患脊柱裂和出生时泌尿生殖缺陷的儿童，对胶乳常见的反应是荨麻疹、血管性水肿、结膜炎，鼻炎、支气管痉挛和过敏性休克。"}}], ["阿昔洛韦凝胶", "Drug", {"identity": 54,"labels": ["Drug"],"properties": {"name": "阿昔洛韦凝胶"}}], ["左卡尼汀口服溶液", "Drug", {"identity": 55, "labels": ["Drug"], "properties": {"name": "左卡尼汀口服溶液"}}]
"""


def generate_system_message_for_relationships() -> str:
    return """
Your task is to identify if a set of relationships make sense.
If they do not make sense please remove them from the dataset.
Some relationships may be duplicated or refer to the same entity. 
Please merge relationships that refer to the same entity.
The datasets contains relationships in the form [ENTITY_ID_1, RELATIONSHIP, ENTITY_ID_2, PROPERTIES].
You will also be given a set of ENTITY_IDs that are valid.
Some relationships may use ENTITY_IDs that are not in the valid set but refer to a entity in the valid set.
If a relationships refer to a ENTITY_ID in the valid set please change the ID so it matches the valid ID.
When you have completed your task please give me the valid relationships in the same format. Only return the relationships no other text.

Here is an example of the input you will be given:
["羊水栓塞", "acompany_with", "急性肺水肿", {"name": "并发症"}], ["放射性心包炎", "acompany_with", "主动脉瓣关闭不全", {"name": "并发症"}], ["alice", "belongs_to", "alice.com", {}], ["bob", "common_drug", "bob.com", {}]
"""


def generate_prompt(data) -> str:
    return f""" Here is the data:
{data}
"""


internalRegex = "\[(.*?)\]"


class DataDisambiguation(BaseComponent):
    def __init__(self, llm) -> None:
        self.llm = llm

    def run(self, data: dict) -> str:
        nodes = sorted(data["nodes"], key=lambda x: x["label"])
        relationships = data["relationships"]
        new_nodes = []
        new_relationships = []

        node_groups = groupby(nodes, lambda x: x["label"])
        for group in node_groups:
            disString = ""
            nodes_in_group = list(group[1])
            if len(nodes_in_group) == 1:
                new_nodes.extend(nodes_in_group)
                continue

            for node in nodes_in_group:
                disString += (
                    '["'
                    + node["name"]
                    + '", "'
                    + node["label"]
                    + '", '
                    + json.dumps(node["properties"])
                    + "]\n"
                )

            messages = [
                {"role": "system", "content": generate_system_message_for_nodes()},
                {"role": "user", "content": generate_prompt(disString)},
            ]
            rawNodes = self.llm.generate(messages)

            n = re.findall(internalRegex, rawNodes)

            new_nodes.extend(nodesTextToListOfDict(n))

        relationship_data = "Relationships:\n"
        for relation in relationships:
            relationship_data += (
                '["'
                + relation["start"]
                + '", "'
                + relation["type"]
                + '", "'
                + relation["end"]
                + '", '
                + json.dumps(relation["properties"])
                + "]\n"
            )

        node_labels = [node["name"] for node in new_nodes]
        relationship_data += "Valid Nodes:\n" + "\n".join(node_labels)

        messages = [
            {
                "role": "system",
                "content": generate_system_message_for_relationships(),
            },
            {"role": "user", "content": generate_prompt(relationship_data)},
        ]
        rawRelationships = self.llm.generate(messages)
        rels = re.findall(internalRegex, rawRelationships)
        new_relationships.extend(relationshipTextToListOfDict(rels))
        return {"nodes": new_nodes, "relationships": new_relationships}
