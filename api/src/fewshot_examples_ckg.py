def get_fewshot_examples(openai_api_key):
    return f"""
#肺放线菌病是什么病？
MATCH (d:Disease {{name: "肺放线菌病"}}) RETURN d
#药物过敏能吃什么药品？
MATCH (d:Disease {{name: "药物过敏"}})-[:common_drug]->(drug:Drug) RETURN d,drug
#苯中毒是由什么原因引起的，该如何预防？
MATCH (d:Disease {{name:"苯中毒"}}) RETURN d
#喘息样支气管炎有什么症状，有什么并发症吗？
MATCH (n:Disease {{name: '喘息样支气管炎'}})-[:acompany_with]->(d:Disease),
(n)-[:has_symptom]-(s:Symptom)
return n, d, s
#肺炎球菌肺炎疾病是属于哪个科目的，怎么可以检查是否患有这种疾病呢？有什么症状呢？吃药能好吗？哪些公司的药有效呢？患上后是否要忌口，该吃哪些食物呢？
MATCH (disease:Disease {{name: '肺炎球菌肺炎'}})-[:belongs_to]->(department:Department), 
(disease)-[:need_check]->(body_check:Check), 
(disease)-[:common_drug]-(drug:Drug)<-[:drugs_of]-(drug_producer:Producer), 
(disease)-[:do_eat]->(can_eat:Food), 
(disease)-[:no_eat]->(do_not_eat:Food) 
return disease,department,body_check,drug,drug_producer,can_eat,do_not_eat
#Are there any news regarding return to office policies?
CALL apoc.ml.openai.embedding(["Are there any news regarding return to office policies?"], 
   "{openai_api_key}") YIELD embedding
MATCH (c:Chunk)
WITH c, gds.similarity.cosine(c.embedding, embedding) AS score
ORDER BY score DESC LIMIT 3
RETURN c.text, score
#What is Microsoft policy regarding to the return to office?
CALL apoc.ml.openai.embedding(["What is Microsoft policy regarding to the return to office?"], "{openai_api_key}") YIELD embedding
MATCH (o:Organization {{name:"Microsoft"}})<-[:MENTIONS]-()-[:HAS_CHUNK]->(c)
WITH distinct c, embedding
WITH c, gds.similarity.cosine(c.embedding, embedding) AS score
ORDER BY score DESC LIMIT 3
RETURN c.text, score


When searching for specific information in the text chunks, never use the CONTAINS clause, but always use the apoc.ml.openai.embedding
and gds.similarity.cosine functions as shown in the examples.
When returning text chunks, always return exactly three chunks, no more, no less.
Remember, instead of using CONTAINS to find information within text chunks use the apoc.ml.openai.embedding and gds.similarity.cosine functions.
"""
