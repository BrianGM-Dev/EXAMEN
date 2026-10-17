/*
 * Banco de preguntas — Databricks Certified Generative AI Engineer Associate
 * Fuente: practica.pdf (110 preguntas). Respuestas oficiales según el PDF.
 *
 * Formato:
 *  id     número de pregunta del PDF
 *  topic  clave de dominio (ver TOPICS)
 *  q      enunciado (inglés, como en el examen real)
 *  code   bloque de código / texto fijo opcional
 *  opts   [texto, explicación de esa opción] en el orden original A, B, C...
 *  ans    letras correctas según el PDF
 *  exp    explicación general de la respuesta correcta
 *  note   advertencia opcional (respuestas debatidas, imágenes faltantes...)
 *  codeOpts  true si las opciones son código
 */
const TOPICS = {
  design: "Diseño de aplicaciones",
  data: "Preparación de datos",
  dev: "Desarrollo de aplicaciones",
  deploy: "Ensamblaje y despliegue",
  gov: "Gobernanza y seguridad",
  eval: "Evaluación y monitoreo"
};

const QUESTIONS = [
{
  id: 1, topic: "data",
  q: "A Generative AI Engineer has created a RAG application to look up answers to questions about a series of fantasy novels that are being asked on the author's web forum. The fantasy novel texts are chunked and embedded into a vector store with metadata (page number, chapter number, book title), retrieved with the user's query, and provided to an LLM for response generation. The Generative AI Engineer used their intuition to pick the chunking strategy and associated configurations but now wants to more methodically choose the best values.\nWhich TWO strategies should the Generative AI Engineer take to optimize their chunking strategy and parameters? (Choose two.)",
  opts: [
    ["Change embedding models and compare performance.", "Cambiar el modelo de embeddings es otra palanca de optimización, pero no evalúa ni ajusta la estrategia de chunking."],
    ["Add a classifier for user queries that predicts which book will best contain the answer. Use this to filter retrieval.", "Es un mecanismo de filtrado posterior al chunking; mejora la recuperación pero no optimiza cómo se trocean los documentos."],
    ["Choose an appropriate evaluation metric (such as recall or NDCG) and experiment with changes in the chunking strategy, such as splitting chunks by paragraphs or chapters. Choose the strategy that gives the best performance metric.", "Correcta: experimentación empírica con una métrica de recuperación (recall, NDCG) para comparar estrategias de chunking."],
    ["Pass known questions and best answers to an LLM and instruct the LLM to provide the best token count. Use a summary statistic (mean, median, etc.) of the best token counts to choose chunk size.", "Pedirle a un LLM un “conteo ideal de tokens” no mide la calidad de recuperación; es una heurística sin validación."],
    ["Create an LLM-as-a-judge metric to evaluate how well previous questions are answered by the most appropriate chunk. Optimize the chunking parameters based upon the values of the metric.", "Correcta: un LLM-as-a-judge da una métrica de calidad por par pregunta–chunk que permite optimizar los parámetros."]
  ],
  ans: "CE",
  exp: "Para elegir el chunking de forma metódica hay que medir: definir una métrica (recall/NDCG sobre la recuperación, o un LLM-as-a-judge sobre qué tan bien el chunk responde la pregunta) y comparar variantes de chunking (párrafo, capítulo, tamaño, solapamiento) quedándose con la que mejor puntúa."
},
{
  id: 2, topic: "design",
  q: "A Generative AI Engineer is designing a RAG application for answering user questions on technical regulations as they learn a new sport.\nWhat are the steps needed to build this RAG application and deploy it?",
  opts: [
    ["Ingest documents from a source → Index the documents and saves to Vector Search → User submits queries against an LLM → LLM retrieves relevant documents → Evaluate model → LLM generates a response → Deploy it using Model Serving", "Evalúa antes de que el LLM genere la respuesta: no hay nada que evaluar todavía."],
    ["Ingest documents from a source → Index the documents and save to Vector Search → User submits queries against an LLM → LLM retrieves relevant documents → LLM generates a response → Evaluate model → Deploy it using Model Serving", "Correcta: ingesta → indexado → consulta → recuperación → generación → evaluación → despliegue."],
    ["Ingest documents from a source → Index the documents and save to Vector Search → Evaluate model → Deploy it using Model Serving", "Omite la consulta, la recuperación y la generación: no hay pipeline RAG que evaluar."],
    ["User submits queries against an LLM → Ingest documents from a source → Index the documents and save to Vector Search → LLM retrieves relevant documents → LLM generates a response → Evaluate model → Deploy it using Model Serving", "El usuario no puede consultar antes de que los documentos estén ingeridos e indexados."]
  ],
  ans: "B",
  exp: "El orden lógico de un RAG es: ingerir documentos, indexarlos en Vector Search, recibir la consulta, recuperar contexto, generar la respuesta, evaluar la calidad del sistema completo y, por último, desplegarlo con Model Serving."
},
{
  id: 3, topic: "eval",
  q: "A Generative AI Engineer just deployed an LLM application at a digital marketing company that assists with answering customer service inquiries.\nWhich metric should they monitor for their customer service LLM application in production?",
  opts: [
    ["Number of customer inquiries processed per unit of time", "Correcta: el throughput es un KPI operativo clave en producción para atención al cliente."],
    ["Energy usage per query", "No es una métrica de negocio/operativa prioritaria para un servicio de atención al cliente."],
    ["Final perplexity scores for the training of the model", "Es una métrica de entrenamiento, no de monitoreo en producción."],
    ["HuggingFace Leaderboard values for the base LLM", "Un benchmark estático del modelo base no refleja el comportamiento de tu aplicación en producción."]
  ],
  ans: "A",
  exp: "En producción se monitorizan métricas de la aplicación real: cuántas consultas se procesan por unidad de tiempo (throughput), latencia, errores, calidad. Las métricas de entrenamiento o de leaderboards no cambian con el uso."
},
{
  id: 4, topic: "design",
  q: "A Generative AI Engineer is building a Generative AI system that suggests the best matched employee team member to newly scoped projects. The team member is selected from a very large team. The match should be based upon project date availability and how well their employee profile matches the project scope. Both the employee profile and project scope are unstructured text.\nHow should the Generative AI Engineer architect their system?",
  opts: [
    ["Create a tool for finding available team members given project dates. Embed all project scopes into a vector store, perform a retrieval using team member profiles to find the best team member.", "Está al revés: indexa proyectos y consulta con perfiles, lo que obliga a recorrer a todos los empleados."],
    ["Create a tool for finding team member availability given project dates, and another tool that uses an LLM to extract keywords from project scopes. Iterate through available team members' profiles and perform keyword matching to find the best available team member.", "El matching por palabras clave pierde la semántica del texto no estructurado y no escala."],
    ["Create a tool to find available team members given project dates. Create a second tool that can calculate a similarity score for a combination of team member profile and the project scope. Iterate through the team members and rank by best score to select a team member.", "Iterar sobre un equipo muy grande calculando similitud par a par es ineficiente frente a un índice vectorial."],
    ["Create a tool for finding available team members given project dates. Embed team profiles into a vector store and use the project scope and filtering to perform retrieval to find the available best matched team members.", "Correcta: perfiles en un vector store + el scope como consulta + filtrado por disponibilidad."]
  ],
  ans: "D",
  exp: "Hay una restricción dura (disponibilidad por fechas) y una blanda (similitud semántica). Lo escalable es indexar los perfiles de empleados como embeddings, usar el alcance del proyecto como consulta y aplicar filtros de disponibilidad en la recuperación."
},
{
  id: 5, topic: "design",
  q: "A Generative AI Engineer is designing an LLM-powered live sports commentary platform. The platform provides real-time updates and LLM-generated analyses for any users who would like to have live summaries, rather than reading a series of potentially outdated news articles.\nWhich tool below will give the platform access to real-time data for generating game analyses based on the latest game scores?",
  opts: [
    ["DatabricksIQ", "Es el motor de IA asistente dentro de Databricks (código, búsqueda), no un servicio de datos en tiempo real."],
    ["Foundation Model APIs", "Dan acceso a LLMs, pero no aportan datos actualizados de partidos."],
    ["Feature Serving", "Correcta: sirve features/datos actualizados con baja latencia a aplicaciones y agentes."],
    ["AutoML", "Automatiza el entrenamiento de modelos ML; no sirve datos en tiempo real."]
  ],
  ans: "C",
  exp: "Feature Serving expone datos estructurados actualizados (p. ej., marcadores) mediante un endpoint de baja latencia que el LLM/agente puede consultar en tiempo de inferencia."
},
{
  id: 6, topic: "eval",
  q: "A Generative AI Engineer has a provisioned throughput model serving endpoint as part of a RAG application and would like to monitor the serving endpoint's incoming requests and outgoing responses. The current approach is to include a micro-service in between the endpoint and the user interface to write logs to a remote server.\nWhich Databricks feature should they use instead which will perform the same task?",
  opts: [
    ["Vector Search", "Sirve para búsqueda por similitud de embeddings, no para registrar tráfico."],
    ["Lakeview", "Son dashboards de visualización; pueden mostrar los datos, pero no los capturan."],
    ["DBSQL", "Es el motor de consultas SQL; no registra automáticamente peticiones de un endpoint."],
    ["Inference Tables", "Correcta: registran automáticamente requests y responses del endpoint en una tabla Delta."]
  ],
  ans: "D",
  exp: "Las Inference Tables capturan automáticamente las peticiones y respuestas de un endpoint de Model Serving en una tabla Delta de Unity Catalog, reemplazando un microservicio de logging propio."
},
{
  id: 7, topic: "gov",
  q: "A Generative AI Engineer is tasked with improving the RAG quality by addressing its inflammatory outputs.\nWhich action would be most effective in mitigating the problem of offensive text outputs?",
  opts: [
    ["Increase the frequency of upstream data updates", "Actualizar más seguido datos ofensivos no elimina el problema."],
    ["Inform the user of the expected RAG behavior", "Gestiona expectativas, pero no corrige la causa."],
    ["Restrict access to the data sources to a limited number of users", "Restringir accesos es seguridad, no evita que el contenido ofensivo llegue al RAG."],
    ["Curate upstream data properly that includes manual review before it is fed into the RAG system", "Correcta: ataca la causa raíz limpiando los datos antes de indexarlos."]
  ],
  ans: "D",
  exp: "Si el RAG produce texto ofensivo, lo más probable es que lo esté recuperando de su base de conocimiento. Curar los datos (con revisión manual) antes de ingerirlos elimina la causa raíz."
},
{
  id: 8, topic: "dev",
  q: "A Generative AI Engineer is creating an LLM-based application. The documents for its retriever have been chunked to a maximum of 512 tokens each. The Generative AI Engineer knows that cost and latency are more important than quality for this application. They have several context length levels to choose from.\nWhich will fulfill their need?",
  opts: [
    ["context length 514; smallest model is 0.44GB and embedding dimension 768", "Cubre los 512 tokens pero es más grande y lento que la opción de 0.13GB."],
    ["context length 2048: smallest model is 11GB and embedding dimension 2560", "Contexto innecesariamente grande y modelo pesado: más coste y latencia."],
    ["context length 32768: smallest model is 14GB and embedding dimension 4096", "El más caro y lento; sobredimensionado para chunks de 512 tokens."],
    ["context length 512: smallest model is 0.13GB and embedding dimension 384", "Correcta: coincide con el tamaño de chunk y es el modelo más pequeño (menor coste y latencia)."]
  ],
  ans: "D",
  exp: "Si coste y latencia priman sobre calidad, se elige el modelo más pequeño cuya ventana de contexto cubra el tamaño de chunk (512). Menor tamaño y menor dimensión del embedding = más barato y rápido."
},
{
  id: 9, topic: "dev",
  q: "A small and cost-conscious startup in the cancer research field wants to build a RAG application using Foundation Model APIs.\nWhich strategy would allow the startup to build a good-quality RAG application while being cost-conscious and able to cater to customer needs?",
  opts: [
    ["Limit the number of relevant documents available for the RAG application to retrieve from", "Ahorra poco y degrada la calidad: el RAG puede perder información clave."],
    ["Pick a smaller LLM that is domain-specific", "Correcta: más barato y, al ser del dominio, mantiene buena calidad."],
    ["Limit the number of queries a customer can send per day", "Reduce costes a costa de la experiencia del cliente."],
    ["Use the largest LLM possible because that gives the best performance for any general queries", "Es la opción más cara y contradice el objetivo de controlar costes."]
  ],
  ans: "B",
  exp: "Un LLM pequeño y especializado en el dominio (biomédico) ofrece buena calidad en ese campo con menor coste y latencia que un modelo grande generalista, sin limitar al cliente."
},
{
  id: 10, topic: "data",
  q: "A Generative AI Engineer is responsible for developing a chatbot to enable their company's internal HelpDesk Call Center team to more quickly find related tickets and provide resolution. They have collected several candidate data sources:\n• call_rep_history: Delta table (representative_id, call_id), maintained to calculate representatives' call resolution from call_duration and call_start_time.\n• transcript Volume: Unity Catalog Volume of all recordings as *.wav files, but also a text transcript as *.txt files.\n• call_cust_history: Delta table (customer_id, call_id), maintained to calculate how much internal customers use the HelpDesk for chargeback.\n• call_detail: Delta table snapshot of all call details updated hourly. It includes root_cause and resolution fields, but those may be empty for calls still active.\n• maintenance_schedule: Delta table listing HelpDesk application outages and planned maintenance downtimes.\nThey need sources that could add context to best identify ticket root cause and resolution.\nWhich TWO sources do that? (Choose two.)",
  opts: [
    ["call_cust_history", "Mide uso para chargeback; no contiene causa raíz ni resolución."],
    ["maintenance_schedule", "Solo cubre caídas/mantenimientos de la propia app HelpDesk: contexto muy acotado."],
    ["call_rep_history", "Métricas de desempeño de los agentes, no información técnica del ticket."],
    ["call_detail", "Correcta: contiene los campos root_cause y resolution."],
    ["transcript Volume", "Correcta: las transcripciones .txt describen el problema y cómo se resolvió."]
  ],
  ans: "DE",
  exp: "Las fuentes que realmente describen causa raíz y resolución son call_detail (campos estructurados root_cause/resolution) y las transcripciones de texto de las llamadas (detalle no estructurado de la conversación)."
},
{
  id: 11, topic: "dev",
  q: "What is the most suitable library for building a multi-step LLM-based workflow?",
  opts: [
    ["Pandas", "Manipulación de datos tabulares; no orquesta LLMs."],
    ["TensorFlow", "Framework de deep learning/entrenamiento, no de encadenamiento de LLMs."],
    ["PySpark", "Procesamiento distribuido de datos; no ofrece abstracciones para cadenas de LLM."],
    ["LangChain", "Correcta: diseñado para encadenar llamadas a LLMs, herramientas, memoria y recuperadores."]
  ],
  ans: "D",
  exp: "LangChain provee abstracciones (chains, prompts, memory, retrievers, agents, tools) precisamente para construir flujos de varios pasos con LLMs."
},
{
  id: 12, topic: "gov",
  q: "When developing an LLM application, it's crucial to ensure that the data used for training the model complies with licensing requirements to avoid legal risks.\nWhich action is NOT appropriate to avoid legal risks?",
  opts: [
    ["Reach out to the data curators directly before you have started using the trained model to let them know.", "Es apropiado: contactar antes permite obtener permiso o negociar."],
    ["Use any available data you personally created which is completely original and you can decide what license to use.", "Es apropiado: con datos propios tú decides la licencia."],
    ["Only use data explicitly labeled with an open license and ensure the license terms are followed.", "Es apropiado: licencia abierta explícita y cumplimiento de sus términos."],
    ["Reach out to the data curators directly after you have started using the trained model to let them know.", "Correcta (NO apropiada): avisar después no subsana una posible infracción ya cometida."]
  ],
  ans: "D",
  exp: "La pregunta pide la acción NO apropiada. El cumplimiento de licencias debe ser proactivo: contactar a los curadores después de usar el modelo es reactivo y no elimina el riesgo legal."
},
{
  id: 13, topic: "dev",
  q: "A Generative AI Engineer is testing a simple prompt template in LangChain using the code below, but is getting an error.\nAssuming the API key was properly defined, what change does the Generative AI Engineer need to make to fix their chain?",
  code: `from langchain.chains import LLMChain
from langchain_community.llms import OpenAI
from langchain_core.prompts import PromptTemplate

prompt_template = "Tell me a {adjective} joke"

prompt = PromptTemplate(
    input_variables=["adjective"],
    template=prompt_template
)

llm = LLMChain(prompt=prompt)
llm.generate([{"adjective": "funny"}])`,
  codeOpts: true,
  opts: [
    [`llm = LLMChain(prompt=prompt)
llm.generate("funny")`, "Sigue faltando el LLM en LLMChain y además generate espera una lista de diccionarios."],
    [`llm = LLMChain(prompt=prompt.format("funny"))
llm.generate()`, "format() devuelve un string, no un PromptTemplate, y sigue sin LLM."],
    [`prompt = PromptTemplate(
    input_variables=["adjective"],
    template=prompt_template
    llm=OpenAI()
)
llm = LLMChain(prompt=prompt)
llm.generate([{"adjective": "funny"}])`, "PromptTemplate no acepta un LLM (y hay un error de sintaxis); el LLM va en LLMChain."],
    [`llm = LLMChain(llm=OpenAI(), prompt=prompt)
llm.generate([{"adjective": "funny"}])`, "Correcta: LLMChain necesita el argumento llm además del prompt."]
  ],
  ans: "D",
  exp: "LLMChain requiere dos piezas: el modelo (llm=...) y el prompt. El código original nunca pasa el LLM; basta con LLMChain(llm=OpenAI(), prompt=prompt)."
},
{
  id: 14, topic: "dev",
  q: "A Generative AI Engineer is creating an LLM system that will retrieve news articles from the year 1918 and related to a user's query and summarize them. The engineer has noticed that the summaries are generated well but often also include an explanation of how the summary was generated, which is undesirable.\nWhich change could the Generative AI Engineer perform to mitigate this issue?",
  opts: [
    ["Split the LLM output by newline characters to truncate away the summarization explanation.", "Es un parche frágil: puede cortar contenido útil y no corrige la causa."],
    ["Tune the chunk size of news articles or experiment with different embedding models.", "Afecta a la recuperación, no al formato de salida del LLM."],
    ["Revisit their document ingestion logic, ensuring that the news articles are being ingested properly.", "Los resúmenes ya salen bien; el problema es el formato, no la ingesta."],
    ["Provide few shot examples of desired output format to the system and/or user prompt.", "Correcta: los ejemplos few-shot muestran exactamente el formato de salida deseado."]
  ],
  ans: "D",
  exp: "Es un problema de formato de salida: se resuelve con prompt engineering, mostrando ejemplos (few-shot) de resúmenes sin explicación para que el modelo imite ese formato."
},
{
  id: 15, topic: "gov",
  q: "A Generative AI Engineer has developed an LLM application to answer questions about internal company policies. The Generative AI Engineer must ensure that the application doesn't hallucinate or leak confidential data.\nWhich approach should NOT be used to mitigate hallucination or confidential data leakage?",
  opts: [
    ["Add guardrails to filter outputs from the LLM before it is shown to the user", "Es válido: filtra salidas problemáticas antes de mostrarlas."],
    ["Fine-tune the model on your data, hoping it will learn what is appropriate and not", "Correcta (NO usar): no garantiza nada y puede hacer que el modelo memorice y filtre datos confidenciales."],
    ["Limit the data available based on the user's access level", "Es válido: control de acceso a los datos según el usuario."],
    ["Use a strong system prompt to ensure the model aligns with your needs.", "Es válido: un buen system prompt reduce alucinaciones y fija límites."]
  ],
  ans: "B",
  exp: "Hacer fine-tuning “esperando que aprenda” no es un control fiable; incluso aumenta el riesgo de que el modelo memorice información confidencial. Guardrails, control de acceso y system prompts son mitigaciones directas."
},
{
  id: 16, topic: "dev",
  q: "A Generative AI Engineer interfaces with an LLM with prompt/response behavior that has been trained on customer calls inquiring about product availability. The LLM is designed to output “In Stock” if the product is available or only the term “Out of Stock” if not.\nWhich prompt will work to allow the engineer to respond to call classification labels correctly?",
  opts: [
    ["Respond with “In Stock” if the customer asks for a product.", "Solo cubre un caso y no da contexto de la entrada."],
    ["You will be given a customer call transcript where the customer asks about product availability. The outputs are either “In Stock” or “Out of Stock”. Format the output in JSON, for example: “call_id”: “123”, “label”: “In Stock”.", "Añade un formato JSON y un call_id que no se pidieron; el modelo debe responder solo la etiqueta."],
    ["Respond with “Out of Stock” if the customer asks for a product.", "Solo cubre un caso y siempre devolvería “Out of Stock”."],
    ["You will be given a customer call transcript where the customer inquires about product availability. Respond with “In Stock” if the product is available or “Out of Stock” if not.", "Correcta: define la entrada y ambas salidas con su condición."]
  ],
  ans: "D",
  exp: "El prompt correcto describe la entrada (transcripción sobre disponibilidad) y mapea claramente las dos etiquetas a su condición, sin añadir formatos que el sistema no espera."
},
{
  id: 17, topic: "dev",
  q: "A Generative AI Engineer is tasked with developing a RAG application that will help a small internal group of experts at their company answer specific questions, augmented by an internal knowledge base. They want the best possible quality in the answers, and neither latency nor throughput is a huge concern given that the user group is small and they're willing to wait for the best answer. The topics are sensitive in nature and the data is highly confidential and so, due to regulatory requirements, none of the information is allowed to be transmitted to third parties.\nWhich model meets all the Generative AI Engineer's needs in this situation?",
  opts: [
    ["Dolly 1.5B", "Es abierto (self-host), pero muy pequeño: calidad inferior."],
    ["OpenAI GPT-4", "Alta calidad, pero envía los datos a un tercero (OpenAI): viola el requisito regulatorio."],
    ["BGE-large", "Es un modelo de embeddings, no un modelo generativo."],
    ["Llama2-70B", "Correcta: abierto (se aloja internamente) y de gran tamaño/calidad."]
  ],
  ans: "D",
  exp: "Se necesita un modelo generativo de alta calidad que se pueda alojar internamente. Llama2-70B es abierto y potente; la latencia extra no importa en este caso."
},
{
  id: 18, topic: "dev",
  q: "A Generative AI Engineer would like an LLM to generate formatted JSON from emails. This will require parsing and extracting the following information: order ID, date, and sender email. Here's a sample email (below).\nThey will need to write a prompt that will extract the relevant information in JSON format with the highest level of output accuracy.\nWhich prompt will do that?",
  code: `Date: April 23, 2024
Time: 4:22 PM
From: anjali.thayer@computex.org
To: cust_service@realtek.com
Subject: Shipment details

Hey there,

I have a shipment (order ID is CD34RFT) can you please send me an update?

Thank you,
Anjali`,
  opts: [
    ["You will receive customer emails and need to extract date, sender email, and order ID. You should return the date, sender email, and order ID information in JSON format.", "Pide JSON pero sin ejemplo: las claves y el formato pueden variar entre respuestas."],
    ["You will receive customer emails and need to extract date, sender email, and order ID. Return the extracted information in JSON format.\nHere's an example: “date”: “April 16, 2024”, “sender_email”: “sarah.lee925@gmail.com”, “order_id”: “RE987D”", "Correcta: el ejemplo fija nombres de claves y formato de valores."],
    ["You will receive customer emails and need to extract date, sender email, and order ID. Return the extracted information in a human-readable format.", "No pide JSON."],
    ["You will receive customer emails and need to extract date, sender email, and order IReturn the extracted information in JSON format.", "Está mal redactado (“order IReturn”) y no incluye ejemplo."]
  ],
  ans: "B",
  exp: "Incluir un ejemplo del JSON esperado (one-shot) es la forma más eficaz de obtener una salida consistente: define las claves exactas (date, sender_email, order_id) y el formato de cada valor."
},
{
  id: 19, topic: "design",
  q: "A Generative AI Engineer has been asked to build an LLM-based question-answering application. The application should take into account new documents that are frequently published. The engineer wants to build this application with the least cost and least development effort and have it operate at the lowest cost possible.\nWhich combination of chaining components and configuration meets these requirements?",
  opts: [
    ["For the application a prompt, a retriever, and an LLM are required. The retriever output is inserted into the prompt which is given to the LLM to generate answers.", "Correcta: RAG básico; los documentos nuevos se incorporan reindexando, sin reentrenar."],
    ["The LLM needs to be frequently with the new documents in order to provide most up-to-date answers.", "Reentrenar con frecuencia es caro y lento."],
    ["For the question-answering application, prompt engineering and an LLM are required to generate answers.", "Sin recuperador el LLM no conoce los documentos nuevos."],
    ["For the application a prompt, an agent and a fine-tuned LLM are required. The agent is used by the LLM to retrieve relevant content that is inserted into the prompt which is given to the LLM to generate answers.", "Agente + fine-tuning añade complejidad y coste innecesarios."]
  ],
  ans: "A",
  exp: "Prompt + retriever + LLM (RAG) es lo más simple y barato: los documentos nuevos se indexan en el vector store y se recuperan en tiempo de consulta, sin fine-tuning ni agentes."
},
{
  id: 20, topic: "design",
  q: "A Generative AI Engineer is creating an agent-based LLM system for their favorite monster truck team. The system can answer text based questions about the monster truck team, lookup event dates via an API call, or query tables on the team's latest standings.\nHow could the Generative AI Engineer best design these capabilities into their system?",
  opts: [
    ["Ingest PDF documents about the monster truck team into a vector store and query it in a RAG architecture.", "Solo cubre las preguntas de texto; no llama a la API ni consulta tablas."],
    ["Write a system prompt for the agent listing available tools and bundle it into an agent system that runs a number of calls to solve a query.", "Correcta: un agente con herramientas (RAG, API, SQL) decide cuál usar y puede encadenarlas."],
    ["Instruct the LLM to respond with “RAG”, “API”, or “TABLE” depending on the query, then use text parsing and conditional statements to resolve the query.", "Router frágil basado en parseo de texto; no permite múltiples pasos."],
    ["Build a system prompt with all possible event dates and table information in the system prompt. Use a RAG architecture to lookup generic text questions and otherwise leverage the information in the system prompt.", "Meter datos dinámicos en el system prompt no escala y se desactualiza."]
  ],
  ans: "B",
  exp: "Con varias capacidades heterogéneas (texto, API, tablas), lo adecuado es un agente con herramientas descritas en el system prompt, que razona qué herramienta llamar y ejecuta tantos pasos como necesite (patrón ReAct)."
},
{
  id: 21, topic: "design",
  q: "A Generative AI Engineer has been asked to design an LLM-based application that accomplishes the following business objective: answer employee HR questions using HR PDF documentation.\nWhich set of high level tasks should the Generative AI Engineer's system perform?",
  opts: [
    ["Calculate averaged embeddings for each HR document, compare embeddings to user query to find the best document. Pass the best document with the user query into an LLM with a large context window to generate a response to the employee.", "Promediar embeddings de documentos enteros pierde granularidad y obliga a pasar documentos completos al LLM."],
    ["Use an LLM to summarize HR documentation. Provide summaries of documentation and user query into an LLM with a large context window to generate a response to the user.", "Los resúmenes pierden detalles necesarios para preguntas específicas."],
    ["Create an interaction matrix of historical employee questions and HR documentation. Use ALS to factorize the matrix and create embeddings. Calculate the embeddings of new queries and use them to find the best HR documentation. Use an LLM to generate a response to the employee question based upon the documentation retrieved.", "ALS es filtrado colaborativo para recomendación, no recuperación de documentos."],
    ["Split HR documentation into chunks and embed into a vector store. Use the employee question to retrieve best matched chunks of documentation, and use the LLM to generate a response to the employee based upon the documentation retrieved.", "Correcta: arquitectura RAG estándar con chunking + vector store + LLM."]
  ],
  ans: "D",
  exp: "El patrón RAG estándar: trocear los PDFs, embeber los chunks en un vector store, recuperar los más relevantes para la pregunta y que el LLM genere la respuesta a partir de ellos."
},
{
  id: 22, topic: "eval",
  q: "A Generative AI Engineer at an electronics company just deployed a RAG application for customers to ask questions about products that the company carries. However, they received feedback that the RAG response often returns information about an irrelevant product.\nWhat can the engineer do to improve the relevance of the RAG's response?",
  opts: [
    ["Assess the quality of the retrieved context", "Ayuda a diagnosticar, pero por sí solo no mejora la relevancia."],
    ["Implement caching for frequently asked questions", "El caché mejora latencia/coste, no la relevancia."],
    ["Use a different LLM to improve the generated response", "El problema está en la recuperación (contexto irrelevante), no en la generación."],
    ["Use a different semantic similarity search algorithm", "Correcta (según el PDF): actúa directamente sobre la etapa de recuperación."]
  ],
  ans: "D",
  exp: "Si la respuesta habla de un producto irrelevante, la recuperación está trayendo contexto equivocado. Cambiar/mejorar el algoritmo de búsqueda semántica actúa sobre la causa.",
  note: "Respuesta debatida: muchos consideran válida “Assess the quality of the retrieved context” como primer paso. Se toma la del PDF."
},
{
  id: 23, topic: "gov",
  q: "A Generative AI Engineer is developing a chatbot designed to assist users with insurance-related queries. The chatbot is built on a large language model (LLM) and is conversational. However, to maintain the chatbot's focus and to comply with company policy, it must not provide responses to questions about politics. Instead, when presented with political inquiries, the chatbot should respond with a standard message:\n“Sorry, I cannot answer that. I am a chatbot that can only answer questions around insurance.”\nWhich framework type should be implemented to solve this?",
  opts: [
    ["Safety Guardrail", "Correcta (según el PDF): bloquea categorías de contenido sensibles o inapropiadas como la política."],
    ["Security Guardrail", "Protege contra accesos no autorizados, ataques, fugas: no es filtrado de temas."],
    ["Contextual Guardrail", "Ajusta el comportamiento dentro de un contexto permitido, en vez de bloquear una categoría entera."],
    ["Compliance Guardrail", "Enfocado en cumplimiento legal/regulatorio, no en filtrar un tema de conversación."]
  ],
  ans: "A",
  exp: "Bloquear una categoría completa de temas (política) y responder con un mensaje estándar se clasifica como safety guardrail: evita que el chatbot genere contenido sensible o controvertido.",
  note: "Respuesta debatida: algunos argumentan que es un guardrail de tema/contexto. Se toma la del PDF."
},
{
  id: 24, topic: "data",
  q: "A Generative AI Engineer is using the code below to test setting up a vector store.\nAssuming they intend to use Databricks managed embeddings with the default embedding model, what should be the next logical function call?",
  code: `from databricks.vector_search.client import VectorSearchClient

vsc = VectorSearchClient()

vsc.create_endpoint(
    name="vector_search_test",
    endpoint_type="STANDARD"
)`,
  opts: [
    ["vsc.get_index()", "Todavía no existe ningún índice que obtener."],
    ["vsc.create_delta_sync_index()", "Correcta: crea un índice sincronizado con una tabla Delta y admite embeddings gestionados."],
    ["vsc.create_direct_access_index()", "El índice de acceso directo requiere que tú escribas los vectores; no usa embeddings gestionados."],
    ["vsc.similarity_search()", "No se puede buscar sin haber creado y poblado un índice."]
  ],
  ans: "B",
  exp: "Tras crear el endpoint, se crea el índice. Con embeddings gestionados por Databricks, el índice debe ser Delta Sync (create_delta_sync_index), que calcula embeddings automáticamente a partir de una columna de texto de la tabla Delta."
},
{
  id: 25, topic: "deploy",
  q: "A Generative AI Engineer is tasked with deploying an application that takes advantage of a custom MLflow Pyfunc model to return some interim results.\nHow should they configure the endpoint to pass the secrets and credentials?",
  opts: [
    ["Use spark.conf.set ()", "Configura la sesión de Spark; no aplica a endpoints de Model Serving."],
    ["Pass variables using the Databricks Feature Store API", "Feature Store gestiona features, no credenciales."],
    ["Add credentials using environment variables", "Correcta: variables de entorno del endpoint (referenciando Databricks Secrets)."],
    ["Pass the secrets in plain text", "Inseguro: nunca exponer secretos en texto plano."]
  ],
  ans: "C",
  exp: "Model Serving permite definir variables de entorno en el endpoint que referencian Databricks Secrets ({{secrets/scope/key}}); el modelo las lee en tiempo de ejecución sin exponer las credenciales."
},
{
  id: 26, topic: "design",
  q: "A Generative AI Engineer wants to build an LLM-based solution to help a restaurant improve its online customer experience with bookings by automatically handling common customer inquiries. The goal of the solution is to minimize escalations to human intervention and phone calls while maintaining a personalized interaction. To design the solution, the Generative AI Engineer needs to define the input data to the LLM and the task it should perform.\nWhich input/output pair will support their goal?",
  opts: [
    ["Input: Online chat logs; Output: Group the chat logs by users, followed by summarizing each user's interactions", "Resume interacciones pero no resuelve la reserva ni reduce escalaciones."],
    ["Input: Online chat logs; Output: Buttons that represent choices for booking details", "Correcta: interpreta la intención y guía la reserva con opciones estructuradas."],
    ["Input: Customer reviews; Output: Classify review sentiment", "Analiza reseñas, no gestiona consultas de reservas."],
    ["Input: Online chat logs; Output: Cancellation options", "Demasiado limitado: solo cubre cancelaciones."]
  ],
  ans: "B",
  exp: "El objetivo es resolver consultas de reserva sin intervención humana. Usar el chat como entrada y devolver opciones accionables (fecha, hora, número de personas) guía al cliente y reduce ambigüedad y escalaciones."
},
{
  id: 27, topic: "dev",
  q: "What is an effective method to preprocess prompts using custom code before sending them to an LLM?",
  opts: [
    ["Directly modify the LLM's internal architecture to include preprocessing steps", "Poco práctico y normalmente imposible con modelos externos."],
    ["It is better not to introduce custom code to preprocess prompts as the LLM has not been trained with examples of the preprocessed prompts", "Falso: el preprocesado de prompts es una práctica habitual y útil."],
    ["Rather than preprocessing prompts, it's more effective to postprocess the LLM outputs to align the outputs to desired outcomes", "El postprocesado es complementario, no un sustituto del preprocesado."],
    ["Write a MLflow PyFunc model that has a separate function to process the prompts", "Correcta: PyFunc permite empaquetar lógica personalizada pre/post LLM y desplegarla."]
  ],
  ans: "D",
  exp: "Un modelo MLflow PyFunc personalizado puede incluir una función de preprocesado del prompt antes de llamar al LLM; queda versionado, testeable y desplegable en Model Serving."
},
{
  id: 28, topic: "gov",
  q: "A Generative AI Engineer is developing an LLM application that users can use to generate personalized birthday poems based on their names.\nWhich technique would be most effective in safeguarding the application, given the potential for malicious user inputs?",
  opts: [
    ["Implement a safety filter that detects any harmful inputs and ask the LLM to respond that it is unable to assist", "Correcta: filtra entradas maliciosas y responde con una negativa controlada."],
    ["Reduce the time that the users can interact with the LLM", "No impide que una entrada maliciosa sea procesada."],
    ["Ask the LLM to remind the user that the input is malicious but continue the conversation with the user", "Sigue procesando la entrada dañina: inseguro."],
    ["Increase the amount of compute that powers the LLM to process input faster", "Más cómputo no tiene relación con la seguridad."]
  ],
  ans: "A",
  exp: "Un filtro de seguridad en la entrada (guardrail) detecta prompts dañinos o de inyección y hace que la app se niegue a ayudar, sin llegar a procesar el contenido malicioso."
},
{
  id: 29, topic: "eval",
  q: "Which indicator should be considered to evaluate the safety of the LLM outputs when qualitatively assessing LLM responses for a translation use case?",
  opts: [
    ["The ability to generate responses in code", "Irrelevante para traducción."],
    ["The similarity to the previous language", "Una traducción literal no implica que sea correcta o segura."],
    ["The latency of the response and the length of text generated", "Son métricas de rendimiento, no de seguridad/calidad del contenido."],
    ["The accuracy and relevance of the responses", "Correcta: una traducción imprecisa puede causar malentendidos peligrosos."]
  ],
  ans: "D",
  exp: "En traducción, la “seguridad” de la salida depende de que sea fiel (precisa) y pertinente al contexto: errores de traducción en instrucciones médicas o legales pueden ser graves."
},
{
  id: 30, topic: "design",
  q: "A Generative AI Engineer is developing a patient-facing healthcare-focused chatbot. If the patient's question is not a medical emergency, the chatbot should solicit more information from the patient to pass to the doctor's office and suggest a few relevant pre-approved medical articles for reading. If the patient's question is urgent, direct the patient to calling their local emergency services.\nGiven the following user input:\n“I have been experiencing severe headaches and dizziness for the past two days.”\nWhich response is most appropriate for the chatbot to generate?",
  opts: [
    ["Here are a few relevant articles for your browsing. Let me know if you have questions after reading them.", "Trata el caso como no urgente y además no recoge información."],
    ["Please call your local emergency services.", "Correcta: síntomas severos y persistentes → escalar a emergencias."],
    ["Headaches can be tough. Hope you feel better soon!", "No sigue ninguna de las reglas del chatbot."],
    ["Please provide your age, recent activities, and any other symptoms you have noticed along with your headaches and dizziness.", "Sería el flujo para casos no urgentes; aquí los síntomas son severos."]
  ],
  ans: "B",
  exp: "Cefalea severa con mareo durante dos días puede indicar una urgencia. Ante el riesgo, la respuesta más segura y alineada con las reglas es derivar a los servicios de emergencia."
},
{
  id: 31, topic: "dev",
  q: "After changing the response generating LLM in a RAG pipeline from GPT-4 to a model with a shorter context length that the company self-hosts, the Generative AI Engineer is getting the following error (below).\nWhat TWO solutions should the Generative AI Engineer implement without changing the response generating model? (Choose two.)",
  code: `{"error_code": "BAD_REQUEST", "message": "Bad request: rpc error:
code = InvalidArgument desc = prompt token count (4595) cannot
exceed 4096..."}`,
  opts: [
    ["Use a smaller embedding model to generate embeddings", "El modelo de embeddings no afecta a cuántos tokens tiene el prompt del LLM."],
    ["Reduce the maximum output tokens of the new model", "El error es por tokens del prompt (entrada), no de salida."],
    ["Decrease the chunk size of embedded documents", "Correcta: chunks más pequeños = menos tokens de contexto en el prompt."],
    ["Reduce the number of records retrieved from the vector database", "Correcta: menos documentos recuperados (k menor) = prompt más corto."],
    ["Retrain the response generating model using ALiBi", "Implica modificar el modelo, lo que la pregunta excluye; además es costoso."]
  ],
  ans: "CD",
  exp: "El prompt (4595 tokens) excede el contexto (4096). El tamaño del prompt depende de cuánto contexto recuperado se inyecta: se reduce bajando el tamaño de los chunks y/o el número de chunks recuperados (top-k)."
},
{
  id: 32, topic: "gov",
  q: "A Generative AI Engineer is building a system which will answer questions on latest stock news articles.\nWhich will NOT help with ensuring the outputs are relevant to financial news?",
  opts: [
    ["Implement a comprehensive guardrail framework that includes policies for content filters tailored to the finance sector.", "Sí ayuda: restringe las salidas al dominio financiero."],
    ["Increase the compute to improve processing speed of questions to allow greater relevancy analysis", "Correcta (NO ayuda): más cómputo solo da velocidad, no relevancia."],
    ["Implement a profanity filter to screen out offensive language.", "Ayuda indirectamente a la calidad y profesionalidad de las salidas."],
    ["Incorporate manual reviews to correct any problematic outputs prior to sending to the users", "Sí ayuda: supervisión humana de la relevancia."]
  ],
  ans: "B",
  exp: "La relevancia depende de datos, filtros/guardrails y revisión. Aumentar el cómputo solo hace el sistema más rápido; no cambia qué contenido genera."
},
{
  id: 33, topic: "data",
  q: "A Generative AI Engineer is building a RAG application that answers questions about internal documents for the company SnoPen AI.\nThe source documents may contain a significant amount of irrelevant content, such as advertisements, sports news, or entertainment news, or content about other companies.\nWhich approach is advisable when building a RAG application to achieve this goal of filtering irrelevant information?",
  opts: [
    ["Keep all articles because the RAG application needs to understand non-company content to avoid answering questions about them.", "Mantener ruido en la base de conocimiento empeora la recuperación."],
    ["Include in the system prompt that any information it sees will be about SnoPenAI, even if no data filtering is performed.", "Es falso e induce errores: el modelo tratará contenido ajeno como si fuera de SnoPen AI."],
    ["Include in the system prompt that the application is not supposed to answer any questions unrelated to SnoPen AI.", "Correcta: instruye al modelo a limitarse al ámbito de la empresa."],
    ["Consolidate all SnoPen AI related documents into a single chunk in the vector database.", "Un único chunk anula la recuperación y desbordaría el contexto."]
  ],
  ans: "C",
  exp: "Entre las opciones, la única aconsejable es acotar el comportamiento mediante el system prompt para que no responda preguntas ajenas a SnoPen AI. (En la práctica, además, convendría filtrar los datos aguas arriba)."
},
{
  id: 34, topic: "data",
  q: "A Generative AI Engineer has successfully ingested unstructured documents and chunked them by document sections. They would like to store the chunks in a Vector Search index. The current format of the dataframe has two columns: (i) original document file name (ii) an array of text chunks for each document.\nWhat is the most performant way to store this dataframe?",
  opts: [
    ["Split the data into train and test set, create a unique identifier for each document, then save to a Delta table", "El split train/test no tiene sentido aquí y el ID por documento no identifica cada chunk."],
    ["Flatten the dataframe to one chunk per row, create a unique identifier for each row, and save to a Delta table", "Correcta: una fila por chunk con clave primaria única en Delta."],
    ["First create a unique identifier for each document, then save to a Delta table", "Deja el array sin aplanar: Vector Search necesita un registro por chunk."],
    ["Store each chunk as an independent JSON file in Unity Catalog Volume. For each JSON file, the key is the document section name and the value is the array of text chunks for that section", "Muchos ficheros pequeños: ineficiente y no es la fuente que usa Vector Search."]
  ],
  ans: "B",
  exp: "Vector Search indexa una fila por registro con una clave primaria. Hay que hacer explode del array (una fila por chunk), asignar un ID único por fila y guardar en una tabla Delta."
},
{
  id: 35, topic: "eval",
  q: "A Generative AI Engineer has created a RAG application which can help employees retrieve answers from an internal knowledge base, such as Confluence pages or Google Drive. The prototype application is now working with some positive feedback from internal company testers. Now the Generative AI Engineer wants to formally evaluate the system's performance and understand where to focus their efforts to further improve the system.\nHow should the Generative AI Engineer evaluate the system?",
  opts: [
    ["Use cosine similarity score to comprehensively evaluate the quality of the final generated answers.", "La similitud coseno sola no mide corrección ni separa recuperación de generación."],
    ["Curate a dataset that can test the retrieval and generation components of the system separately. Use MLflow's built in evaluation metrics to perform the evaluation on the retrieval and generation components.", "Correcta: evaluar cada componente por separado indica dónde mejorar."],
    ["Benchmark multiple LLMs with the same data and pick the best LLM for the job.", "Solo evalúa la generación e ignora la recuperación."],
    ["Use an LLM-as-a-judge to evaluate the quality of the final answers generated.", "Válido para la respuesta final, pero no aísla el rendimiento de la recuperación."]
  ],
  ans: "B",
  exp: "Para saber dónde enfocar mejoras hay que evaluar por separado la recuperación (precision@k, recall, MRR…) y la generación (corrección, groundedness…), con un dataset curado y las métricas de MLflow."
},
{
  id: 36, topic: "deploy",
  q: "A Generative AI Engineer has already trained an LLM on Databricks and it is now ready to be deployed.\nWhich of the following steps correctly outlines the easiest process for deploying a model on Databricks?",
  opts: [
    ["Log the model as a pickle object, upload the object to Unity Catalog Volume, register it to Unity Catalog using MLflow, and start a serving endpoint", "Pasos manuales innecesarios que saltan el tracking de MLflow."],
    ["Log the model using MLflow during training, directly register the model to Unity Catalog using the MLflow API, and start a serving endpoint", "Correcta: flujo nativo MLflow → Unity Catalog → Model Serving."],
    ["Save the model along with its dependencies in a local directory, build the Docker image, and run the Docker container", "Gestionar Docker manualmente es más complejo."],
    ["Wrap the LLM's prediction function into a Flask application and serve using Gunicorn", "Servir manualmente con Flask/Gunicorn requiere mucha más infraestructura."]
  ],
  ans: "B",
  exp: "La vía más sencilla en Databricks: registrar el modelo con MLflow durante el entrenamiento, registrarlo en Unity Catalog y crear un endpoint de Model Serving gestionado."
},
{
  id: 37, topic: "deploy",
  q: "A Generative AI Engineer developed an LLM application using the provisioned throughput Foundation Model API. Now that the application is ready to be deployed, they realize their volume of requests are not sufficiently high enough to create their own provisioned throughput endpoint. They want to choose a strategy that ensures the best cost-effectiveness for their application.\nWhat strategy should the Generative AI Engineer use?",
  opts: [
    ["Switch to using External Models instead", "No resuelve el coste y añade dependencia de terceros."],
    ["Deploy the model using pay-per-token throughput as it comes with cost guarantees", "Correcta: pagas solo por tokens consumidos, ideal para bajo volumen."],
    ["Change to a model with a fewer number of parameters in order to reduce hardware constraint issues", "Sacrifica calidad y no aborda el modelo de cobro."],
    ["Throttle the incoming batch of requests manually to avoid rate limiting issues", "Retrasar peticiones no reduce el coste total."]
  ],
  ans: "B",
  exp: "Provisioned throughput compensa con volumen alto y sostenido. Con poco tráfico, pay-per-token es más rentable porque el coste es proporcional al uso real."
},
{
  id: 38, topic: "dev",
  q: "A Generative AI Engineer is building an LLM to generate article summaries in the form of a type of poem, such as a haiku, given the article content. However, the initial output from the LLM does not match the desired tone or style.\nWhich approach will NOT improve the LLM's response to achieve the desired response?",
  opts: [
    ["Provide the LLM with a prompt that explicitly instructs it to generate text in the desired tone and style", "Sí mejora: instrucciones explícitas de estilo."],
    ["Use a neutralizer to normalize the tone and style of the underlying documents", "Correcta (NO mejora): cambiar el estilo de la entrada no enseña al modelo el estilo de salida."],
    ["Include few-shot examples in the prompt to the LLM", "Sí mejora: ejemplos del estilo deseado."],
    ["Fine-tune the LLM on a dataset of desired tone and style", "Sí mejora: ajusta el modelo al estilo objetivo."]
  ],
  ans: "B",
  exp: "Para controlar el estilo de salida se actúa sobre el modelo o el prompt (instrucciones, few-shot, fine-tuning). Neutralizar el tono de los artículos de entrada no aporta nada al estilo poético deseado."
},
{
  id: 39, topic: "design",
  q: "A Generative AI Engineer is creating an LLM-powered application that will need access to up-to-date news articles and stock prices.\nThe design requires the use of stock prices which are stored in Delta tables and finding the latest relevant news articles by searching the internet.\nHow should the Generative AI Engineer architect their LLM system?",
  opts: [
    ["Use an LLM to summarize the latest news articles and lookup stock tickers from the summaries to find stock prices.", "Depende de extraer tickers de resúmenes ruidosos y no define cómo obtener las noticias."],
    ["Query the Delta table for volatile stock prices and use an LLM to generate a search query to investigate potential causes of the stock volatility.", "Resuelve un caso de uso muy concreto, no el acceso general a ambas fuentes."],
    ["Download and store news articles and stock price information in a vector store. Use a RAG architecture to retrieve and generate at runtime.", "Precargar noticias las deja desactualizadas; los precios no son texto para un vector store."],
    ["Create an agent with tools for SQL querying of Delta tables and web searching, provide retrieved values to an LLM for generation of response.", "Correcta: herramienta SQL para Delta + herramienta de búsqueda web, orquestadas por un agente."]
  ],
  ans: "D",
  exp: "Hay dos fuentes distintas: datos estructurados en Delta (SQL) y noticias actuales en Internet (búsqueda web). Un agente con ambas herramientas obtiene datos frescos y se los pasa al LLM."
},
{
  id: 40, topic: "eval",
  q: "A Generative AI Engineer is designing a chatbot for a gaming company that aims to engage users on its platform while its users play online video games.\nWhich metric would help them increase user engagement and retention for their platform?",
  opts: [
    ["Randomness", "La aleatoriedad pura genera respuestas sin sentido."],
    ["Diversity of responses", "Correcta: respuestas variadas mantienen la conversación fresca y atractiva."],
    ["Lack of relevance", "Respuestas irrelevantes frustran al usuario."],
    ["Repetition of responses", "La repetición aburre y reduce el engagement."]
  ],
  ans: "B",
  exp: "Para engagement en un chatbot de entretenimiento interesa que las respuestas sean diversas (y relevantes); se controla con parámetros como temperature o top-p."
},
{
  id: 41, topic: "design",
  q: "A company has a typical RAG-enabled, customer-facing chatbot on its website.\nSelect the correct sequence of components a user's questions will go through before the final output is returned. Use the diagram above for reference.",
  code: `                ┌─────┐     ┌─────┐
User Questions ─►│  1  │ ──► │  2  │
       │        └─────┘     └──┬──┘
       │                       │
       └──────────────┐        ▼
┌────────┐   ┌─────┐  └──► ┌─────┐
│ Output │◄──│  4  │ ◄──── │  3  │
└────────┘   └─────┘       └─────┘`,
  opts: [
    ["1.embedding model, 2.vector search, 3.context-augmented prompt, 4.response-generating LLM", "Correcta: embeber la pregunta → buscar → construir prompt con contexto (+ pregunta original) → generar."],
    ["1.context-augmented prompt, 2.vector search, 3.embedding model, 4.response-generating LLM", "No se puede aumentar el prompt antes de buscar contexto."],
    ["1.response-generating LLM, 2.vector search, 3.context-augmented prompt, 4.embedding model", "El LLM generador va al final, no al principio."],
    ["1.response-generating LLM, 2.context-augmented prompt, 3.vector search, 4.embedding model", "Orden invertido: el embedding es el primer paso."]
  ],
  ans: "A",
  exp: "La pregunta se convierte en vector (1), se buscan chunks similares (2), se combinan con la pregunta original en un prompt aumentado (3, por eso la flecha directa desde el usuario) y el LLM genera la salida (4)."
},
{
  id: 42, topic: "dev",
  q: "A team wants to serve a code generation model as an assistant for their software developers. It should support multiple programming languages. Quality is the primary objective.\nWhich of the Databricks Foundation Model APIs, or models available in the Marketplace, would be the best fit?",
  opts: [
    ["Llama2-70b", "Modelo generalista; no especializado en código."],
    ["BGE-large", "Modelo de embeddings: no genera código."],
    ["MPT-7b", "Modelo general y pequeño."],
    ["CodeLlama-34B", "Correcta: especializado en generación de código multi-lenguaje."]
  ],
  ans: "D",
  exp: "CodeLlama fue entrenado adicionalmente sobre grandes volúmenes de código en múltiples lenguajes, por lo que ofrece mejor calidad en generación de código que los modelos generalistas."
},
{
  id: 43, topic: "data",
  q: "A Generative AI Engineer is building a RAG application that will rely on context retrieved from source documents that are currently in PDF format. These PDFs can contain both text and images. They want to develop a solution using the least amount of lines of code.\nWhich Python package should be used to extract the text from the source documents?",
  opts: [
    ["flask", "Framework web; no extrae texto."],
    ["beautifulsoup", "Parsea HTML/XML, no PDFs."],
    ["unstructured", "Correcta: extrae texto (y elementos) de PDFs con texto e imágenes con muy poco código."],
    ["numpy", "Librería numérica; irrelevante aquí."]
  ],
  ans: "C",
  exp: "La librería unstructured ofrece una interfaz única (p. ej., partition_pdf) para extraer texto y elementos de documentos complejos como PDFs con imágenes, ideal para pipelines RAG con mínimo código."
},
{
  id: 44, topic: "design",
  q: "A Generative AI Engineer received the following business requirements for an external chatbot.\nThe chatbot needs to know what types of questions the user asks and routes to appropriate models to answer the questions. For example, the user might ask about upcoming event details. Another user might ask about purchasing tickets for a particular event.\nWhat is an ideal workflow for such a chatbot?",
  opts: [
    ["The chatbot should only look at previous event information", "No cubre eventos futuros ni compras."],
    ["There should be two different chatbots handling different types of user queries.", "Duplica recursos y empeora la experiencia; no hay enrutamiento."],
    ["The chatbot should be implemented as a multi-step LLM workflow. First, identify the type of question asked, then route the question to the appropriate model. If it's an upcoming event question, send the query to a text-to-SQL model. If it's about ticket purchasing, the customer should be redirected to a payment platform.", "Correcta: clasificar intención y enrutar al componente adecuado."],
    ["The chatbot should only process payments", "Ignora las preguntas sobre eventos."]
  ],
  ans: "C",
  exp: "Un flujo multi-paso primero clasifica la intención y luego enruta: preguntas de eventos → text-to-SQL sobre la base de eventos; compras → plataforma de pago."
},
{
  id: 45, topic: "dev",
  q: "A Generative AI Engineer is tasked with developing an application that is based on an open source large language model (LLM). They need a foundation LLM with a large context window.\nWhich model fits this need?",
  opts: [
    ["DistilBERT", "Modelo encoder pequeño (512 tokens), no un LLM generativo con gran contexto."],
    ["MPT-30B", "Contexto de 8k tokens."],
    ["Llama2-70B", "Contexto de 4k tokens."],
    ["DBRX", "Correcta: LLM abierto de Databricks con contexto de 32k tokens."]
  ],
  ans: "D",
  exp: "De las opciones, DBRX tiene la mayor ventana de contexto (32k tokens), frente a 8k de MPT-30B y 4k de Llama2-70B."
},
{
  id: 46, topic: "dev",
  q: "A Generative AI Engineer is building an LLM-based application that has an important transcription (speech-to-text) task. Speed is essential for the success of the application.\nWhich open Generative AI models should be used?",
  opts: [
    ["DBRX", "LLM de texto; no transcribe audio."],
    ["MPT-30B-Instruct", "LLM de texto; no transcribe audio."],
    ["Llama-2-70b-chat-hf", "LLM de texto; no transcribe audio."],
    ["whisper-large-v3 (1.6B)", "Correcta: modelo ASR (speech-to-text) abierto y relativamente pequeño."]
  ],
  ans: "D",
  exp: "Whisper es el modelo abierto de reconocimiento de voz (ASR) de referencia; los demás son LLMs de texto que no procesan audio."
},
{
  id: 47, topic: "eval",
  q: "A Generative AI Engineer has a provisioned throughput model serving endpoint as part of a RAG application and would like to monitor the serving endpoint's incoming requests and outgoing responses.\nWhich Databricks feature should they use?",
  opts: [
    ["AutoML", "Automatiza entrenamiento de modelos."],
    ["Vector Search", "Búsqueda por similitud, no monitoreo."],
    ["Inference Tables", "Correcta: registran requests y responses del endpoint en Delta."],
    ["Feature Serving", "Sirve features, no registra el tráfico del endpoint."]
  ],
  ans: "C",
  exp: "Las Inference Tables capturan automáticamente las entradas y salidas de los endpoints de Model Serving (incluidos provisioned throughput) para depuración, auditoría y monitoreo."
},
{
  id: 48, topic: "eval",
  q: "A Generative AI Engineer is deciding between using LSH (Locality Sensitive Hashing) and HNSW (Hierarchical Navigable Small World) for indexing their vector database. Their top priority is semantic accuracy.\nWhich approach should the Generative AI Engineer use to evaluate these two techniques?",
  opts: [
    ["Compare the cosine similarities of the embeddings of returned results against those of a representative sample of test inputs", "Correcta: mide la cercanía semántica en el espacio vectorial de los resultados devueltos."],
    ["Compare the Bilingual Evaluation Understudy (BLEU) scores of returned results for a representative sample of test inputs", "BLEU evalúa traducción/generación por n-gramas, no recuperación vectorial."],
    ["Compare the Recall-Oriented-Understudy for Gisting Evaluation (ROUGE) scores of returned results for a representative sample of test inputs", "ROUGE evalúa resúmenes por solapamiento léxico."],
    ["Compare the Levenshtein distances of returned results against a representative sample of test inputs", "Distancia de edición entre strings: no captura semántica."]
  ],
  ans: "A",
  exp: "LSH y HNSW son métodos de búsqueda aproximada en el espacio de embeddings; para comparar su precisión semántica se mide la similitud coseno entre los vectores de consulta y los resultados devueltos."
},
{
  id: 49, topic: "gov",
  q: "When developing an LLM application, it's crucial to ensure that the data used for training the model complies with licensing requirements to avoid legal risks.\nWhich action is most appropriate to avoid legal risks?",
  opts: [
    ["Only use data explicitly labeled with an open license and ensure the license terms are followed.", "Correcta: permiso legal claro y cumplimiento de sus condiciones."],
    ["Any LLM outputs are reasonable to use because they do not reveal the original sources of data directly.", "Falso: no revelar la fuente no elimina la infracción."],
    ["Reach out to the data curators directly to gain written consent for using their data.", "Puede ser válido, pero no escala y no es la práctica más directa entre las opciones."],
    ["Use any publicly available data as public data does not have legal restrictions.", "Falso: “público” no significa “libre de derechos”."]
  ],
  ans: "A",
  exp: "Usar solo datos con licencia abierta explícita y respetar sus términos (atribución, uso comercial, etc.) es la práctica más clara y escalable para evitar riesgos legales."
},
{
  id: 50, topic: "dev",
  q: "A Generative AI Engineer interfaces with an LLM with instruction-following capabilities trained on customer calls inquiring about product availability. The LLM should output “Success” if the product is available or “Fail” if not.\nWhich prompt allows the engineer to receive call classification labels correctly?",
  opts: [
    ["You are a helpful assistant that reads customer call transcripts. Walk through the transcript and think step-by-step if the customer's inquiries are addressed successfully. Answer “Success” if yes; otherwise, answer “Fail”.", "Cambia el criterio (si la consulta fue atendida) y el razonamiento paso a paso añade texto extra."],
    ["You will be given a customer call transcript where the customer asks about product availability. Classify the call as “Success” if the product is available and “Fail” if the product is unavailable.", "Correcta: criterio exacto (disponibilidad) y salida binaria clara."],
    ["You will be given a customer call transcript where the customer asks about product availability. The outputs are either “Success” or “Fail”. Format the output in JSON, for example: \"call_id\": \"123\", \"label\": \"Succes\".", "No define cuándo es cada etiqueta, añade JSON no pedido y el ejemplo tiene un error tipográfico."],
    ["You will be given a customer call transcript. Answer “Success” if the customer call has been resolved successfully. Answer “Fail” if the call is redirected or if the question is not resolved.", "Cambia el criterio a “resolución de la llamada” en vez de disponibilidad del producto."]
  ],
  ans: "B",
  exp: "La etiqueta depende de la disponibilidad del producto. El prompt correcto describe la entrada y asigna “Success”/“Fail” exactamente según esa condición."
},
{
  id: 51, topic: "design",
  q: "Which TWO chain components are required for building a basic LLM-enabled chat application that includes conversational capabilities, knowledge retrieval, and contextual memory? (Choose two.)",
  opts: [
    ["Vector Stores", "Correcta: aportan la recuperación de conocimiento."],
    ["Conversation Buffer Memory", "Correcta: mantienen la memoria del contexto conversacional."],
    ["External tools", "Útiles para agentes, pero no requeridos en un chat básico."],
    ["Chat loaders", "Cargan historiales de chat existentes; no son imprescindibles."],
    ["React Components", "Componentes de UI (React), no de la cadena."]
  ],
  ans: "AB",
  exp: "Recuperación de conocimiento → vector store; memoria contextual → memoria de conversación (p. ej., ConversationBufferMemory). El LLM aporta la capacidad conversacional."
},
{
  id: 52, topic: "data",
  q: "A Generative AI Engineer has written scalable PySpark code to ingest unstructured PDF documents and chunk them in preparation for storing in a Databricks Vector Search index. Currently, the two columns of their dataframe include the original filename as a string and an array of text chunks from that document.\nWhat set of steps should the Generative AI Engineer perform to store the chunks in a ready-to-ingest manner for Databricks Vector Search?",
  opts: [
    ["Use PySpark's autoloader to apply a UDF across all chunks, formatting them in a JSON structure for Vector Search ingestion.", "Vector Search no ingiere JSON; usa una tabla Delta como fuente."],
    ["Flatten the dataframe to one chunk per row, create a unique identifier for each row, and enable change feed on the output Delta table.", "Correcta: una fila por chunk, clave primaria y Change Data Feed activado."],
    ["Utilize the original filename as the unique identifier and save the dataframe as is.", "El nombre de fichero no es único por chunk y el array queda sin aplanar."],
    ["Create a unique identifier for each document, flatten the dataframe to one chunk per row and save to an output Delta table.", "Casi, pero el ID es por documento (no por fila) y falta habilitar Change Data Feed."]
  ],
  ans: "B",
  exp: "Un índice Delta Sync requiere una tabla Delta con una fila por registro, una clave primaria única y Change Data Feed habilitado para sincronizar cambios incrementalmente."
},
{
  id: 53, topic: "dev",
  q: "A Generative AI Engineer is asked to build an LLM application that would excel at code generation. They need to select a model that has been specifically trained to generate code.\nWhich model would likely produce the best results out of the box?",
  opts: [
    ["CodeLlama-34b-Instruct-hf", "Correcta: entrenado en código y ajustado a instrucciones."],
    ["Mixtral-8x7B-v0.1", "Modelo base generalista."],
    ["Llama-2-70b-hf", "Modelo base generalista, no especializado en código."],
    ["mpt-7b-8k-instruct", "Modelo general pequeño."]
  ],
  ans: "A",
  exp: "CodeLlama-Instruct está específicamente entrenado sobre código y afinado para seguir instrucciones en lenguaje natural, por lo que rinde mejor de serie en generación de código."
},
{
  id: 54, topic: "design",
  q: "A Generative AI Engineer needs to design an LLM pipeline to conduct multi-stage reasoning that leverages external tools. To be effective at this, the LLM will need to plan and adapt actions while performing complex reasoning tasks.\nWhich approach will do this?",
  opts: [
    ["Train the LLM to generate a single, comprehensive response without interacting with any external tools, relying solely on its pre-trained knowledge.", "No usa herramientas externas, que es un requisito."],
    ["Use a Chain-of-Thought (CoT) prompting technique to guide the LLM through a series of reasoning steps, then manually input the results from external tools for the final answer.", "La intervención manual impide que el LLM adapte sus acciones."],
    ["Implement a framework like ReAct, which allows the LLM to generate reasoning traces and perform task-specific actions that leverage external tools if necessary.", "Correcta: ciclo razonar → actuar → observar → adaptar."],
    ["Encourage the LLM to make multiple API calls in sequence without planning or structuring the calls, allowing the LLM to decide when and how to use external tools spontaneously.", "Sin planificación las llamadas son caóticas y poco fiables."]
  ],
  ans: "C",
  exp: "ReAct (Reason + Act) intercala razonamiento y acciones con herramientas, observa los resultados y ajusta los siguientes pasos: justo lo que pide un razonamiento multi-etapa con herramientas."
},
{
  id: 55, topic: "design",
  q: "A Generative AI Engineer at an automotive company would like to build a question-answering chatbot for customers to inquire about their vehicles. They have a database containing various documents of different vehicle makes, their hardware parts, and common maintenance information.\nWhich of the following components will NOT be useful in building such a chatbot?",
  opts: [
    ["Invite users to submit long, rather than concise, questions", "Correcta (NO útil): las preguntas largas introducen ambigüedad y ruido."],
    ["Response-generating LLM", "Útil: genera la respuesta."],
    ["Embedding model", "Útil: vectoriza preguntas y documentos."],
    ["Vector database", "Útil: almacena y busca los embeddings."]
  ],
  ans: "A",
  exp: "LLM, modelo de embeddings y base vectorial son las piezas de un RAG. Pedir preguntas largas no aporta nada y puede empeorar la recuperación."
},
{
  id: 56, topic: "dev",
  q: "A Generative AI Engineer is building an LLM to generate article headlines given the article content. However, the initial output from the LLM does not match the desired tone or style.\nWhich approach would be most effective for adjusting the LLM's response to achieve the desired response?",
  opts: [
    ["Exclude any article headlines that do not match the desired output", "Filtrar a posteriori no cambia cómo genera el modelo."],
    ["Fine-tune the LLM on a dataset of desired tone and style", "Funciona, pero es más costoso; se recurre a ello si el prompting no basta."],
    ["Provide the LLM with a prompt that explicitly instructs it to generate text in the desired tone and style", "Correcta: lo más rápido, barato y eficaz como primer paso."],
    ["All of the above", "Excluir titulares no es un método para ajustar la generación."]
  ],
  ans: "C",
  exp: "La buena práctica es empezar por prompt engineering: indicar explícitamente el tono y estilo. Solo si no es suficiente se pasa a fine-tuning."
},
{
  id: 57, topic: "design",
  q: "A Generative AI Engineer is creating a customer support bot that should respond differently to an end user based on the sentiment in their initial message. For example, if the end user's message was angry, the bot should try to de-escalate their negative sentiments as it solves the customer query. They want to make sure their approach follows best practices.\nWhich approach will do this?",
  opts: [
    ["Use an encoder-only LLM model to both detect sentiment and generate replies based upon the detected sentiment.", "Un modelo solo-encoder no genera texto."],
    ["Implement a RAG architecture for how to respond to users depending on detected sentiment.", "RAG recupera conocimiento; no es la herramienta para adaptar el tono por sentimiento."],
    ["Use linear regression model to classify sentiment and feed the result to a system prompt for the LLM to respond.", "La regresión lineal no es un clasificador adecuado para sentimiento."],
    ["Create a chain which first uses an LLM to classify sentiment, then changes system prompt for the customer interaction LLM based upon the initial customer query sentiment.", "Correcta: cadena clasificar → ajustar system prompt → responder."]
  ],
  ans: "D",
  exp: "Una cadena en dos pasos separa responsabilidades: un LLM clasifica el sentimiento y, según el resultado, se elige el system prompt (p. ej., uno de desescalada) para el LLM que atiende al cliente."
},
{
  id: 58, topic: "gov",
  q: "A Generative AI Engineer is ready to deploy an LLM application written using Foundation Model APIs. They want to follow security best practices for production scenarios.\nWhich authentication method should they choose?",
  opts: [
    ["Use OAuth machine-to-machine authentication", "Opción válida en general, pero la respuesta esperada es el token de service principal."],
    ["Use an access token belonging to service principals", "Correcta: identidad no humana, independiente de usuarios y con mínimo privilegio."],
    ["Use an access token belonging to any workspace user", "Ligado a una persona: si se va o cambia de rol, la app falla; mala práctica."],
    ["Use a frequently rotated access token belonging to either a workspace user or a service principal", "Sigue permitiendo tokens de usuario, que no son recomendados en producción."]
  ],
  ans: "B",
  exp: "En producción se usan service principals: identidades para aplicaciones, auditables, con permisos mínimos y sin depender de cuentas de personas."
},
{
  id: 59, topic: "data",
  q: "A Generative AI Engineer is developing a RAG system for their company to perform internal document Q&A for structured HR policies, but the answers returned are frequently incomplete and unstructured. It seems that the retriever is not returning all relevant context. The Generative AI Engineer has experimented with different embedding and response generating LLMs but that did not improve results.\nWhich TWO options could be used to improve the response quality? (Choose two.)",
  opts: [
    ["Add the section header as a prefix to chunks", "Correcta: aporta contexto semántico al chunk y mejora su recuperación."],
    ["Split the document by sentence", "Chunks demasiado pequeños: aún menos contexto."],
    ["Use a larger embedding model", "Ya probaron otros embeddings sin mejora; el problema es el chunking."],
    ["Increase the document chunk size", "Correcta: chunks más grandes mantienen juntas las unidades lógicas de información."],
    ["Fine tune the response generation model", "El problema es la recuperación, no la generación (ya cambiaron LLMs sin efecto)."]
  ],
  ans: "AD",
  exp: "Si cambiar modelos no ayudó, el cuello de botella es el chunking. Prefijar los chunks con el encabezado de sección y aumentar el tamaño del chunk dan más contexto a cada fragmento recuperado."
},
{
  id: 60, topic: "gov",
  q: "A Generative AI Engineer is building a production-ready LLM system which replies directly to customers. The solution makes use of the Foundation Model API via provisioned throughput. They are concerned that the LLM could potentially respond in a toxic or otherwise unsafe way. They also wish to perform this with the least amount of effort.\nWhich approach will do this?",
  opts: [
    ["Ask users to report unsafe responses", "Reactivo: el daño ya ocurrió."],
    ["Host Llama Guard on Foundation Model API and use it to detect unsafe responses.", "Correcta: modelo de seguridad especializado, listo para usar."],
    ["Add some LLM calls to their chain to detect unsafe content before returning text", "Requiere diseñar y mantener prompts de moderación propios: más esfuerzo."],
    ["Add a regex expression on inputs and outputs to detect unsafe responses.", "Las regex no capturan toxicidad matizada."]
  ],
  ans: "B",
  exp: "Llama Guard es un modelo específicamente entrenado para clasificar entradas/salidas inseguras; desplegarlo en Foundation Model APIs da una protección proactiva con el mínimo esfuerzo."
},
{
  id: 61, topic: "dev",
  q: "A Generative AI Engineer would like an LLM to parse and extract the following information: date, sender email, and order ID. The output should be formatted into JSON. Here's an email sample (below).\nThey need a prompt that will extract and output the required information in JSON with the highest level of output accuracy.\nWhich prompt will do that?",
  code: `Date: April 16, 2024
Time: 3:45 PM
From: sarah.lee925@gmail.com
To: customer_service@smart_thermostat.com
Subject: Order update

Hi,

Can I get a status update on my order? The order ID is RE987D.

Thank you,
Sarah`,
  opts: [
    ["You will receive customer emails and need to extract date, sender email, and order ID. Return the extracted information in a human-readable format.", "No pide JSON."],
    ["You will receive customer emails and need to extract date, sender email, and order ID. Return the extracted information in JSON format.", "Pide JSON pero sin ejemplo: las claves pueden variar."],
    ["You will receive customer emails and need to extract date, sender email, and order ID. Return the extracted information in JSON format. Here's an example: \"date\":\"April 16, 2024\", \"sender_email\":\"sarah.lee925@gmail.com\", \"order_id\":\"RE987D\"", "Correcta: el ejemplo fija claves y formato."],
    ["You will receive customer emails and need to extract date, sender email, and order IYou should return the date, sender email, and order ID information in JSON format.", "Mal redactado y sin ejemplo."]
  ],
  ans: "C",
  exp: "Igual que en la pregunta 18: dar un ejemplo del JSON exacto esperado es lo que maximiza la precisión y consistencia de la salida."
},
{
  id: 62, topic: "eval",
  q: "A Generative AI Engineer has built an LLM-based system that will automatically translate user text between two languages. They now want to benchmark multiple LLM's on this task and pick the best one. They have an evaluation set with known high quality translation examples. They want to evaluate each LLM using the evaluation set with a performant metric.\nWhich metric should they choose for this evaluation?",
  opts: [
    ["BLEU metric", "Correcta: diseñada para traducción automática comparando con traducciones de referencia."],
    ["NDCG metric", "Métrica de ranking (búsqueda/recomendación)."],
    ["ROUGE metric", "Orientada a resumen (recall de n-gramas)."],
    ["RECALL metric", "Genérica; no evalúa la calidad de una traducción."]
  ],
  ans: "A",
  exp: "BLEU mide la precisión de n-gramas respecto a traducciones de referencia (con penalización por brevedad) y es el estándar para traducción automática."
},
{
  id: 63, topic: "dev",
  q: "A Generative AI Engineer is using an LLM to classify species of edible mushrooms based on text descriptions of certain features. The model is returning accurate responses in testing and the Generative AI Engineer is confident they have the correct list of possible labels, but the output frequently contains additional reasoning in the answer when the Generative AI Engineer only wants to return the label with no additional text.\nWhich action should they take to elicit the desired behavior from this LLM?",
  opts: [
    ["Use few shot prompting to instruct the model on expected output format", "Correcta: los ejemplos muestran que la salida debe ser solo la etiqueta."],
    ["Use zero shot prompting to instruct the model on expected output format", "Sin ejemplos el modelo puede seguir añadiendo razonamiento."],
    ["Use zero shot chain-of-thought prompting to prevent a verbose output format", "CoT provoca más razonamiento, justo lo contrario."],
    ["Use a system prompt to instruct the model to be succinct in its answer", "“Sé conciso” es vago; los ejemplos son más fiables para fijar el formato."]
  ],
  ans: "A",
  exp: "Few-shot prompting demuestra el formato exacto (descripción → etiqueta sola), lo que es más fiable que una instrucción genérica para eliminar texto extra."
},
{
  id: 64, topic: "design",
  q: "A Generative AI Engineer is working with a retail company that wants to enhance its customer experience by automatically handling common customer inquiries. They are working on an LLM-powered AI solution that should improve response times while maintaining a personalized interaction. They want to define the appropriate input and LLM task to do this.\nWhich input/output pair will do this?",
  opts: [
    ["Input: Customer service chat logs; Output: Group the chat logs by users, followed by summarizing each user's interactions, then respond", "Correcta (según el PDF): agrupar por usuario y resumir su historial permite responder de forma personalizada."],
    ["Input: Customer service chat logs; Output: Find the answers to similar questions and respond with a summary", "Responde rápido, pero no personaliza según el historial del usuario."],
    ["Input: Customer reviews; Output: Classify review sentiment", "No responde consultas."],
    ["Input: Customer reviews; Output: Group the reviews by users and aggregate per-user average rating, then respond", "Las reseñas no son consultas de clientes."]
  ],
  ans: "A",
  exp: "Usar los chats de soporte, agruparlos por usuario y resumir su historial permite al LLM responder automáticamente con contexto del cliente (personalización) y rapidez.",
  note: "Respuesta debatida: algunos prefieren “Find the answers to similar questions…”. Se toma la del PDF."
},
{
  id: 65, topic: "dev",
  q: "A Generative AI Engineer is developing a RAG application and would like to experiment with different embedding models to improve the application performance.\nWhich strategy for picking an embedding model should they choose?",
  opts: [
    ["Pick an embedding model with multilingual support to support potential multilingual user questions", "Solo útil si realmente hay preguntas multilingües; no garantiza calidad en el dominio."],
    ["Pick the most recent and most performant open LLM released at the time", "Un LLM no es un modelo de embeddings, y “más reciente” no implica mejor para tu dominio."],
    ["Pick an embedding model trained on related domain knowledge", "Correcta: embeddings del dominio capturan mejor la semántica de tus documentos."],
    ["Pick the embedding model ranked highest on the Massive Text Embedding Benchmark (MTEB) leaderboard hosted by HuggingFace", "Un benchmark general no garantiza el mejor rendimiento en tu dominio."]
  ],
  ans: "C",
  exp: "La calidad de la recuperación mejora con embeddings que entienden el vocabulario del dominio. Lo ideal es elegir modelos entrenados en dominios afines y validarlos con tus datos."
},
{
  id: 66, topic: "deploy",
  q: "A Generative AI Engineer wants their finetuned LLMs in their prod Databricks workspace available for testing in their dev workspace as well. All of their workspaces are Unity Catalog enabled and they are currently logging their models into the Model Registry in MLflow.\nWhat is the most cost-effective and secure option for the Generative AI Engineer to accomplish their goal?",
  opts: [
    ["Use an external model registry which can be accessed from all workspaces.", "Añade complejidad y riesgo fuera de la gobernanza de Databricks."],
    ["Use MLflow to log the model directly into Unity Catalog, and enable READ access in the dev workspace to the model.", "Correcta: UC es compartido entre workspaces y gobierna permisos."],
    ["Setup a duplicate training pipeline in dev, so that an identical model is available in dev.", "Duplica costes y puede producir modelos distintos."],
    ["Setup a script to export the model from prod and import it to dev.", "Manual, propenso a errores y sin gobernanza de versiones."]
  ],
  ans: "B",
  exp: "Unity Catalog es un metastore compartido entre workspaces: registrando el modelo en UC y concediendo permisos de lectura, el workspace de dev puede usarlo sin copias."
},
{
  id: 67, topic: "eval",
  q: "A Generative AI Engineer has just deployed an LLM application at a manufacturing company that assists with answering customer service inquiries. They need to identify the key enterprise metrics to monitor the application in production.\nWhich is NOT a metric they will implement for their customer service LLM application in production?",
  opts: [
    ["Massive Multi-task Language Understanding (MMLU) score", "Correcta (NO se usa): es un benchmark estático del modelo, no una métrica de producción."],
    ["Number of customer inquiries processed per unit of time", "Sí: throughput."],
    ["Factual accuracy of the response", "Sí: calidad de las respuestas."],
    ["Time taken for LLM to generate a response", "Sí: latencia."]
  ],
  ans: "A",
  exp: "MMLU evalúa conocimientos generales del modelo durante el desarrollo/selección; no cambia con el tráfico real. En producción se monitorizan throughput, latencia y calidad/precisión."
},
{
  id: 68, topic: "deploy",
  q: "A Generative AI Engineer is helping a cinema extend its website's chat bot to be able to respond to questions about specific showtimes for movies currently playing at their local theater. They already have the location of the user provided by location services to their agent, and a Delta table which is continually updated with the latest showtime information by location. They want to implement this new capability in their RAG application.\nWhich option will do this with the least effort and in the most performant way?",
  opts: [
    ["Create a Feature Serving Endpoint from a FeatureSpec that references an online store synced from the Delta table. Query the Feature Serving Endpoint as part of the agent logic / tool implementation.", "Correcta: búsqueda por clave (ubicación) de baja latencia sobre datos sincronizados."],
    ["Query the Delta table directly via a SQL query constructed from the user's input using a text-to-SQL LLM in the agent logic / tool implementation.", "Text-to-SQL añade latencia y riesgo de errores en la consulta generada."],
    ["Set up a task in Databricks Workflows to write the information in the Delta table periodically to an external database such as MySQL and query the information from there as part of the agent logic / tool implementation.", "Infraestructura extra y datos potencialmente desactualizados."],
    ["Write the Delta table contents to a text column, then embed those texts using an embedding model and store these in the vector index. Look up the information based on the embedding as part of the agent logic / tool implementation.", "La búsqueda semántica no es apropiada para lookups estructurados exactos."]
  ],
  ans: "A",
  exp: "La ubicación ya es conocida: basta un lookup por clave. Feature Serving sobre un online store sincronizado con la tabla Delta da datos actualizados con muy baja latencia y poco esfuerzo."
},
{
  id: 69, topic: "dev",
  q: "A Generative AI Engineer needs to build an LLM application that can understand medical documents, including recently published ones. They want to select an open model available on HuggingFace's model hub.\nWhich step is most appropriate for selecting an LLM?",
  opts: [
    ["Pick any model in the Mistral family, as Mistral models are good with all types of use cases", "Ninguna familia es buena para todo; no considera el dominio médico."],
    ["Select a model based on the highest number of downloads, as this indicates popularity, reliability, and general suitability", "Popularidad no implica idoneidad para medicina."],
    ["Select a model that is most recently uploaded, as this indicates the model is the newest and highly likely to be the most performant", "Más reciente no significa mejor ni entrenado en medicina."],
    ["Check for the model and training data description to identify if the model is trained on any medical data.", "Correcta: la model card indica datos de entrenamiento y usos previstos."]
  ],
  ans: "D",
  exp: "Para un dominio especializado como medicina hay que revisar la model card y los datos de entrenamiento para confirmar que el modelo vio corpus médicos/biomédicos."
},
{
  id: 70, topic: "data",
  q: "A Generative AI Engineer is building a RAG application that answers questions about technology-related news articles. The source documents may contain a significant amount of irrelevant content, such as advertisements, sports news, or entertainment news.\nWhich approach is NOT advisable for building a RAG application focused on answering technology-only questions?",
  opts: [
    ["Include in the system prompt that the application is not supposed to answer any questions unrelated to technology.", "Aconsejable: acota el comportamiento."],
    ["Filter out irrelevant news articles in the retrieval process.", "Aconsejable: evita contexto irrelevante."],
    ["Keep all news articles because the RAG application needs to understand non-technological content to avoid answering questions about them.", "Correcta (NO aconsejable): añade ruido y empeora la recuperación."],
    ["Filter out irrelevant news articles in the upstream document database.", "Aconsejable: limpieza de datos en origen."]
  ],
  ans: "C",
  exp: "Un RAG funciona mejor con datos limpios y enfocados. Mantener todo el contenido irrelevante solo introduce ruido; el resto de opciones filtran o acotan."
},
{
  id: 71, topic: "data",
  q: "A Generative AI Engineer is building a RAG application that will rely on context retrieved from source documents that are currently in HTML format. They want to develop a solution using the least amount of lines of code.\nWhich Python package should be used to extract the text from the source documents?",
  opts: [
    ["pytesseract", "OCR para imágenes; el HTML ya es texto."],
    ["numpy", "Librería numérica."],
    ["pypdf2", "Para PDFs, no HTML."],
    ["beautifulsoup", "Correcta: parseo de HTML y extracción de texto con get_text()."]
  ],
  ans: "D",
  exp: "BeautifulSoup parsea HTML y extrae el texto con muy pocas líneas (BeautifulSoup(html).get_text())."
},
{
  id: 72, topic: "design",
  q: "A Generative AI Engineer is building a RAG application for answering employee questions on company policies.\nWhat are the steps needed to build this RAG application and deploy it?",
  opts: [
    ["Ingest documents from a source → Index the documents and saves to Vector Search → User submits queries against an LLM → LLM retrieves relevant documents → Evaluate model → LLM generates a response → Deploy it using Model Serving", "Evalúa antes de generar la respuesta."],
    ["User submits queries against an LLM → Ingest documents from a source → Index the documents and save to Vector Search → LLM retrieves relevant documents → LLM generates a response → Evaluate model → Deploy it using Model Serving", "Consulta antes de tener documentos indexados."],
    ["Ingest documents from a source → Index the documents and save to Vector Search → Evaluate model → Deploy it using Model Serving → User submits queries against an LLM → LLM retrieves relevant documents → LLM generates a response", "Evalúa y despliega sin haber probado la recuperación y la generación."],
    ["Ingest documents from a source → Index the documents and save to Vector Search → User submits queries against an LLM → LLM retrieves relevant documents → LLM generates a response → Evaluate model → Deploy it using Model Serving", "Correcta: orden lógico completo del ciclo RAG."]
  ],
  ans: "D",
  exp: "Mismo concepto que la pregunta 2: ingesta → indexado → consulta → recuperación → generación → evaluación → despliegue."
},
{
  id: 73, topic: "gov",
  q: "A Generative AI Engineer who was prototyping an LLM system accidentally ran thousands of inference queries against a Foundation Model endpoint over the weekend. They want to take action to prevent this from unintentionally happening again in the future.\nWhat action should they take?",
  opts: [
    ["Use prompt engineering to instruct the LLM endpoints to refuse too many subsequent queries.", "El LLM no tiene noción del volumen de llamadas; y cada llamada ya se cobra."],
    ["Require that all development code which interfaces with a Foundation Model endpoint must be reviewed by a Staff level engineer before execution.", "Proceso lento que no impone un límite técnico."],
    ["Build a pyfunc model which proxies to the Foundation Model endpoint and add throttling within the pyfunc model.", "Funciona, pero añade complejidad innecesaria."],
    ["Configure rate limiting on the Foundation Model endpoints.", "Correcta: límite nativo de peticiones en el endpoint (AI Gateway)."]
  ],
  ans: "D",
  exp: "Los endpoints de Databricks (vía AI Gateway) admiten rate limits por usuario/endpoint; es la forma directa y nativa de evitar consumos accidentales masivos."
},
{
  id: 74, topic: "data",
  q: "A Generative AI Engineer is setting up a Databricks Vector Search that will lookup news articles by topic within 10 days of the date specified. An example query might be “Tell me about monster truck news around January 5th 1992”. They want to do this with the least amount of effort.\nHow can they set up their Vector Search index to support this use case?",
  opts: [
    ["Create separate indexes by topic and add a classifier model to appropriately pick the best index.", "Muchos índices + clasificador: mucho más esfuerzo y no resuelve el filtro por fecha."],
    ["Include metadata columns for article date and topic to support metadata filtering.", "Correcta: filtrar por rango de fechas y tema con metadatos."],
    ["Pass the query directly to the vector search index and return the best articles.", "La similitud semántica no aplica bien restricciones de fecha."],
    ["Split articles by 10 day blocks and return the block closest to the query.", "Bloques fijos no equivalen a “±10 días de una fecha”."]
  ],
  ans: "B",
  exp: "Vector Search permite combinar similitud con filtros por metadatos. Guardar fecha y tema como columnas permite filtrar el rango de ±10 días y el tema con mínimo esfuerzo."
},
{
  id: 75, topic: "deploy",
  q: "A Generative AI Engineer developed an LLM application using the pay-per-token Foundation Model API. Now that the application is ready to be deployed, they would like to ensure the model endpoint can serve high incoming volumes of requests in production.\nWhat should the Generative AI Engineer consider?",
  opts: [
    ["Switch to using External Models instead", "No garantiza capacidad y añade dependencia externa."],
    ["Throttle the incoming batch of requests manually to avoid rate limiting issues", "Retrasa peticiones; no aumenta la capacidad."],
    ["Change to a model with a fewer number of parameters in order to reduce hardware constraint issues", "Sacrifica calidad sin garantizar capacidad."],
    ["Deploy the model using provisioned throughput as it comes with performance guarantees", "Correcta: capacidad reservada con garantías de rendimiento para producción."]
  ],
  ans: "D",
  exp: "Pay-per-token es para uso variable/bajo y tiene límites; para volúmenes altos en producción se usa provisioned throughput, que garantiza capacidad y rendimiento."
},
{
  id: 76, topic: "design",
  q: "A Generative AI Engineer at a home appliance company has been asked to design an LLM based application that accomplishes the following business objective: answer customer questions on home appliances using the associated instruction manuals.\nWhich set of high-level tasks should the Generative AI Engineer's system perform?",
  opts: [
    ["Split instruction manuals into chunks and embed into a vector store. Use the question to retrieve best matched chunks of manual, and use the LLM to generate a response to the user based upon the manual retrieved.", "Correcta: RAG estándar con chunking."],
    ["Create an interaction matrix of historical user questions and appliance instruction manuals. Use ALS to factorize the matrix and create embeddings. Calculate the embeddings of new queries and use them to find the best manual. Use an LLM to generate a response to the question based upon the manual retrieved.", "ALS es para recomendación, no recuperación de documentos."],
    ["Calculate averaged embeddings for each instruction manual, compare embeddings to user query to find the best manual. Pass the best manual with user query into an LLM with a large context window to generate a response to the employee.", "Embeddings promediados pierden granularidad."],
    ["Use an LLM to summarize all of the instruction manuals. Provide summaries of each manual and user query into an LLM with a large context window to generate a response to the user.", "Los resúmenes omiten detalles necesarios."]
  ],
  ans: "A",
  exp: "Igual que la pregunta 21: trocear manuales, embeber, recuperar los chunks relevantes y generar la respuesta con el LLM."
},
{
  id: 77, topic: "gov",
  q: "A Generative AI Engineer is developing an LLM application to interact with users to provide personalized movie recommendations.\nGiven the potential for malicious user inputs, which technique would be most effective in safeguarding the application?",
  opts: [
    ["Reduce the time that the users can interact with the LLM", "No evita entradas maliciosas."],
    ["Increase the amount of compute that powers the LLM to process input faster", "El cómputo no tiene relación con la seguridad."],
    ["Ask the LLM to remind the user that the input is malicious but continue the conversation with the user", "Continúa procesando contenido dañino."],
    ["Implement a safety filter that detects any harmful inputs and ask the LLM to respond that it is unable to assist", "Correcta: guardrail de entrada con negativa controlada."]
  ],
  ans: "D",
  exp: "Igual que la pregunta 28: un filtro de seguridad que detecta entradas dañinas y responde que no puede ayudar es la protección más eficaz."
},
{
  id: 78, topic: "design",
  q: "A Generative AI Engineer received the following business requirements for an internal chatbot. The internal chatbot needs to know what types of questions the user asks and route them to appropriate models to answer the questions. For example, the user might ask about historical failure rates of a specific electrical part. Another user might ask about how to troubleshoot a piece of electrical equipment.\nAvailable data sources include a database of electrical equipment PDF manuals and also a table with information on when an electrical part experiences failure.\nWhich workflow supports such a chatbot?",
  opts: [
    ["Parse the electrical equipment PDF manuals into a table of question and response pairs. That way, the same chatbot can query tables easily to answer questions about both historical failure rates and equipment troubleshooting.", "Convertir manuales en pares P/R es costoso y pierde flexibilidad."],
    ["The chatbot should be implemented as a multi-step LLM workflow. First, identify the type of question asked, then route the question to the appropriate model. If it's a historical failure rate question, send the query to a text-to-SQL model. If it's a troubleshooting question, then send the query to another model that summarizes the equipment-specific document and generates the response.", "Correcta: enrutamiento por intención a text-to-SQL o a recuperación de manuales."],
    ["There should be two different chatbots handling different types of user queries.", "Duplica esfuerzo y no cumple el requisito de enrutar."],
    ["The table with electrical part failures should be converted into a text document first. That way, the same chatbot can use the same document retrieval process to generate answers regardless of question types.", "Pierde la ventaja de consultar datos estructurados (agregaciones, tasas)."]
  ],
  ans: "B",
  exp: "Cada tipo de dato pide su herramienta: tasas de fallo (tabla) → text-to-SQL; troubleshooting (PDFs) → recuperación + resumen. Un flujo multi-paso clasifica y enruta."
},
{
  id: 79, topic: "gov",
  q: "A Generative AI Engineer is building a system that will answer questions on currently unfolding news topics. As such, it pulls information from a variety of sources including articles and social media posts. They are concerned about toxic posts on social media causing toxic outputs from their system.\nWhich guardrail will limit toxic outputs?",
  opts: [
    ["Reduce the amount of context items the system will include in consideration for its response.", "Menos contexto no garantiza menos toxicidad."],
    ["Use only approved social media and news accounts to prevent unexpected toxic data from getting to the LLM.", "Correcta: controla la calidad de las fuentes antes de que lleguen al LLM."],
    ["Log all LLM system responses and perform a batch toxicity analysis monthly.", "Reactivo y con un mes de retraso."],
    ["Implement rate limiting.", "Controla volumen, no contenido."]
  ],
  ans: "B",
  exp: "Limitar las fuentes a cuentas aprobadas actúa de forma preventiva: evita que contenido tóxico entre como contexto y se refleje en la respuesta."
},
{
  id: 80, topic: "eval",
  q: "A Generative AI Engineer has created a RAG application which can help employees interpret HR documentation. The prototype application is now working with some positive feedback from internal company testers. Now the Generative AI Engineer wants to formally evaluate the system's performance and understand where to focus their efforts to further improve the system.\nHow should the Generative AI Engineer evaluate the system?",
  opts: [
    ["Use ROUGE score to comprehensively evaluate the quality of the final generated answers.", "Solo solapamiento léxico de la respuesta final; no aísla la recuperación."],
    ["Use an LLM-as-a-judge to evaluate the quality of the final answers generated.", "Evalúa la respuesta final, pero no la recuperación por separado."],
    ["Curate a dataset that can test the retrieval and generation components of the system separately. Use MLflow's built in evaluation metrics to perform the evaluation on the retrieval and generation components.", "Correcta: evaluación por componentes con métricas de MLflow."],
    ["Benchmark multiple LLMs with the same data and pick the best LLM for the job.", "Solo compara LLMs."]
  ],
  ans: "C",
  exp: "Igual que la pregunta 35: evaluar recuperación y generación por separado con un dataset curado y MLflow muestra dónde está el problema."
},
{
  id: 81, topic: "dev",
  q: "A Generative AI Engineer is using LangChain to assist a museum in classifying documents and using this code (below).\nTheir code results in an error.\nWhat do they need to change in order to fix this template?",
  code: `from langchain import PromptTemplate

template_text = """
You are an automated archeological assistant helping identify documents relevant to ancient Egypt. If the
document is relevant return "relevant", else return "irrelevant" with no additional text.
Document:" {document_input}"
Response:
"""

prompt_template = PromptTemplate(
    input_variables=["document_input"]
)

completed_prompt = prompt_template.format(
    document_input=document_input
)`,
  opts: [
    ["Provide an LLM argument to PromptTemplate()", "PromptTemplate no recibe un LLM."],
    ["Provide template and LLM arguments to PromptTemplate()", "El template sí falta, pero el LLM no va en PromptTemplate."],
    ["Omit PromptTemplate(), it is only used for multi-part templates", "Falso: PromptTemplate sirve para cualquier plantilla."],
    ["Provide a template argument to PromptTemplate()", "Correcta: falta template=template_text."]
  ],
  ans: "D",
  exp: "El PromptTemplate se crea sin el argumento obligatorio template; hay que pasar template=template_text junto con input_variables."
},
{
  id: 82, topic: "design",
  q: "A Generative AI Engineer has been reviewing issues with their company's LLM based question-answering assistant and has determined that a technique called prompt chaining could help alleviate some performance concerns. However, to suggest this to their team, they have to clearly explain how it works and how it can benefit their question-answering assistant.\nWhich explanation do they communicate to the team?",
  opts: [
    ["It allows you to break down complex tasks into multiple independent subtasks. This enables the assistant to generate more comprehensive and accurate responses.", "Correcta: descomponer tareas complejas en pasos encadenados mejora la calidad."],
    ["It allows you to reduce the latency of your applications. By having multiple chains participating in the response as a chain, you increase the rate at which the response is generated.", "Encadenar suele aumentar la latencia (más llamadas)."],
    ["It allows you to decrease the effort involved in crafting a prompt. Chains make it possible to reuse prompt text across multiple different use cases.", "La reutilización de prompts no es el propósito del encadenamiento."],
    ["It reduces the average cost of a typical request. Chains make more efficient use of the tokens produced to generate higher quality responses with fewer tokens.", "Más llamadas suelen implicar más tokens y coste."]
  ],
  ans: "A",
  exp: "Prompt chaining divide una tarea compleja en subtareas, donde la salida de un paso alimenta al siguiente; cada paso es más simple de optimizar y el resultado final es más preciso."
},
{
  id: 83, topic: "dev",
  q: "An AI developer team wants to fine tune an open-weight model to have exceptional performance on a code generation use case. They are trying to choose the best model to start with. They want to minimize model hosting costs, and are using Huggingface model cards and spaces to explore models.\nWhich TWO model attributes and metrics should the team focus on to make their selection? (Choose two.)",
  opts: [
    ["Big Code Models Leaderboard", "Correcta: benchmark específico de generación de código."],
    ["Number of model parameters", "Correcta: determina el coste de alojamiento."],
    ["MTEB Leaderboard", "Benchmark de embeddings de texto."],
    ["Chatbot Arena Leaderboard", "Evalúa capacidades conversacionales generales."],
    ["Number of model downloads last month", "La popularidad no indica rendimiento en código ni coste."]
  ],
  ans: "AB",
  exp: "Dos requisitos: rendimiento en código → Big Code Models Leaderboard; minimizar coste de hosting → número de parámetros (tamaño del modelo)."
},
{
  id: 84, topic: "data",
  q: "A Generative AI Engineer at an automotive company would like to build a question-answering chatbot to help customers answer specific questions about their vehicles. They have:\n• A catalog with hundreds of thousands of cars manufactured since the 1960s\n• Historical searches, with user queries and successful matches\n• Descriptions of their own cars in multiple languages\nThey have already selected an open source LLM and created a test set of user queries. They need to discard techniques that will not help them build the chatbot.\nWhich do they discard?",
  opts: [
    ["Setting chunk size to match the model's context window to maximize coverage", "Correcta (se descarta): chunks enormes diluyen el embedding y empeoran la recuperación."],
    ["Implementing metadata filtering based on car models and years", "Útil: acota por modelo y año en un catálogo enorme."],
    ["Fine-tuning an embedding model on automotive terminology", "Útil: tienen búsquedas históricas con matches para entrenarlo."],
    ["Adding few-shot examples for response generation", "Útil: mejora formato y calidad de las respuestas."]
  ],
  ans: "A",
  exp: "El tamaño del chunk no debe igualar la ventana de contexto del modelo: chunks muy grandes mezclan temas, “diluyen” el embedding y hacen la recuperación ruidosa y cara."
},
{
  id: 85, topic: "data",
  q: "A Generative AI Engineer at a legal firm is designing a RAG system to analyze historical legal case precedents. The system needs to process millions of court opinions and legal documents, already organized by time and topic, to track how interpretations of specific laws have evolved over time. All of these documents are in plain-text. The engineer needs to choose a chunking method that would most effectively preserve continuity and the temporal nature of the cases.\nWhich method do they choose?",
  opts: [
    ["Implement windowed summarization with overlapping chunks.", "Correcta: el solapamiento mantiene la continuidad del razonamiento legal entre chunks."],
    ["Implement a hierarchical tree structure, like RAPTOR, to group similar legal concepts.", "Agrupa por similitud conceptual, no preserva el orden temporal."],
    ["Implement paragraph level embeddings with each chunk.", "Sin solapamiento se rompen argumentos que cruzan párrafos."],
    ["Implement sentence level embeddings with each chunk tagged with the time to enable metadata filtering.", "Frases sueltas pierden el contexto del razonamiento."]
  ],
  ans: "A",
  exp: "Las opiniones legales tienen argumentos que se extienden por varias secciones. Ventanas solapadas (con resumen) conservan la continuidad y, sobre documentos ya ordenados en el tiempo, la evolución de la interpretación."
},
{
  id: 86, topic: "eval",
  q: "A Generative AI Engineer is developing an agent system using a popular agent-authoring library. The agent comprises multiple parallel and sequential chains. The engineer encounters challenges as the agent fails at one of the steps, making it difficult to debug the root cause. They need to find an appropriate approach to research this issue and discover the cause of failure.\nWhich approach do they choose?",
  opts: [
    ["Enable MLflow tracing to gain visibility into each agent's behavior and execution step.", "Correcta: trazas con entradas, salidas, tiempos y errores de cada paso."],
    ["Run MLflow.evaluate to determine root cause of failed step.", "Evalúa calidad sobre un dataset; no depura la ejecución paso a paso."],
    ["Implement structured logging within the agent's code to capture detailed execution information.", "Posible, pero manual y costoso frente al tracing automático."],
    ["Deconstruct the agent into independent steps to simplify debugging.", "Requiere reescribir el sistema."]
  ],
  ans: "A",
  exp: "MLflow Tracing (con autolog para LangChain, LlamaIndex, etc.) registra cada span del agente —entradas, salidas, latencia y excepciones— y permite ver exactamente qué paso falla."
},
{
  id: 87, topic: "dev",
  q: "A Generative AI Engineer is experimenting with using parameters to configure an agent in Mosaic Agent Framework. However, they are struggling to get the agent to respond with relevant information with this configuration (below).\nWhich error is causing the problem?",
  code: `config_dict = {
    "prompt_template": "You are a trivia bot. Generate a trivia question based on the user's input.",
    "prompt_template_input_vars": ["user_input"],
    "model_serving_endpoint": "databricks-dbrx-instruct",
    "llm_parameters": {"temperature": 0.01, "max_tokens": 500},
}`,
  opts: [
    ["The prompt does not parse the user's input vars", "Correcta: declara user_input pero el template no contiene {user_input}."],
    ["The prompt does not set the retriever schema", "No hay retriever en este caso de uso."],
    ["The prompt does not list available agents for the LLM to call", "No es un sistema multi-agente."],
    ["The prompt is not wrapped in ChatModel", "No es un requisito de esta configuración."]
  ],
  ans: "A",
  exp: "La variable user_input está declarada en prompt_template_input_vars, pero el texto del template no la incluye ({user_input}), así que la entrada del usuario nunca llega al prompt."
},
{
  id: 88, topic: "dev",
  q: "A Generative AI Engineer is using LangGraph to define multiple tools in a single agentic application. They want to enable the main orchestrator LLM to decide on its own which tools are most appropriate to call for a given prompt. To do this, they must determine the general flow of the code.\nWhich sequence will do this?",
  opts: [
    ["1. Define or import the tools 2. Add tools and LLM to the agent 3. Create the ReAct agent", "Orden incorrecto: no se añaden herramientas a un agente que aún no existe."],
    ["1. Define or import the tools 2. Define the agent 3. Initialize the agent with ReAct, the LLM, and the tools", "Correcta: herramientas → agente → inicializar con ReAct, LLM y tools."],
    ["1. Define the tools 2. Load each tool into a separate agent 3. Instruct the LLM to use ReAct to call the appropriate agent", "Crea un agente por herramienta: innecesariamente complejo."],
    ["1. Define the tools inside the agents 2. Load the agents into the LLM 3. Instruct the LLM to use CoT reasoning to determine the appropriate agent", "Los agentes no se “cargan” en el LLM y CoT no ejecuta herramientas."]
  ],
  ans: "B",
  exp: "Primero se definen las herramientas, luego el agente (grafo) y finalmente se inicializa con el patrón ReAct, el LLM y la lista de herramientas (p. ej., create_react_agent(llm, tools))."
},
{
  id: 89, topic: "deploy",
  q: "All of the following are python APIs used to query Databricks foundation models. When running in an interactive notebook, which of the following libraries does not automatically use the current session credentials?",
  opts: [
    ["OpenAI client", "Configurado vía Databricks SDK / helpers, toma credenciales del contexto."],
    ["REST API via requests library", "Correcta: con requests debes construir tú la cabecera Authorization con un token."],
    ["MLflow Deployments SDK", "get_deploy_client('databricks') usa automáticamente las credenciales del notebook."],
    ["Databricks Python SDK", "WorkspaceClient() detecta automáticamente la autenticación del notebook."]
  ],
  ans: "B",
  exp: "Las librerías de Databricks/MLflow detectan la autenticación del notebook. Una llamada REST con requests es HTTP “crudo”: hay que pasar manualmente el host y el token."
},
{
  id: 90, topic: "gov",
  q: "A Generative AI Engineer is deploying a customer-facing, fine-tuned LLM on their public website. Given the large investment the company put into fine tuning this model, and the proprietary nature of the tuning data, they are concerned about model inversion attacks.\nWhich of the following Databricks AI Security Framework (DASF) risk mitigation strategies are most relevant to this use case?",
  opts: [
    ["Implement AI guardrails to allow users to configure and enforce compliance", "Correcta: filtran prompts/respuestas que intentan extraer datos de entrenamiento."],
    ["Leverage Databricks access control lists (ACLs) to configure permissions for accessing models", "Controla quién accede, pero el modelo es público: cualquier usuario legítimo puede atacar."],
    ["Use secure model features with Databricks Feature Store", "No relacionado con ataques de inversión."],
    ["Apply attribute-based access controls (ABAC) to limit unauthorized access", "Igual que ACLs: no protege frente a usuarios autorizados malintencionados."]
  ],
  ans: "A",
  exp: "En un modelo público, el atacante es un usuario con acceso legítimo. Los guardrails en inferencia detectan y bloquean consultas de extracción y salidas que filtren datos de entrenamiento."
},
{
  id: 91, topic: "data",
  q: "A team uses Mosaic AI Vector Search to retrieve documents for their Retrieval-Augmented Generation (RAG) pipeline. The search query returns five relevant documents, and the first three are added to the prompt as context. Performance evaluation with Agent Evaluation shows that some lower-ranked retrieved documents have higher context relevancy scores than higher-ranked documents.\nWhich option should the team consider to optimize this workflow?",
  opts: [
    ["Use a reranker to order the documents based on the relevance scores.", "Correcta: reordena los resultados con un modelo más preciso (cross-encoder)."],
    ["Modify the prompt to instruct the LLM to order the documents based on the relevance scores.", "Solo se pasan 3 al prompt: los mejores ya quedaron fuera."],
    ["Use a different embedding model for computing document embeddings.", "Podría ayudar, pero no ataca directamente el problema de orden."],
    ["Increase the number of documents added to the prompt to improve context relevance.", "Añade ruido y tokens en vez de corregir el orden."]
  ],
  ans: "A",
  exp: "El problema es de orden: los documentos más relevantes quedan en posiciones 4–5 y no entran al prompt. Un reranker reordena los candidatos para que los 3 mejores sean los que se usan."
},
{
  id: 92, topic: "eval",
  q: "A generative AI engineer is deploying an AI agent authored with MLflow's ChatAgent interface for a retail company's customer support system on Databricks. The agent must handle thousands of inquiries daily, and the engineer needs to track its performance and quality in real-time to ensure it meets service-level agreements.\nWhich metrics are automatically captured by default and made available for monitoring when the agent is deployed using the Mosaic AI Agent Framework?",
  opts: [
    ["Operational metrics like request volume, latency, and errors", "Correcta: se capturan por defecto al desplegar."],
    ["Quality metrics like correctness and guideline adherence", "Requieren configurar evaluación/monitoreo con jueces; no son por defecto."],
    ["Both operational and quality metrics", "Las de calidad no se capturan automáticamente."],
    ["No metrics are automatically captured", "Falso: las operativas sí."]
  ],
  ans: "A",
  exp: "Al desplegar un agente, el endpoint expone de serie métricas operativas (volumen, latencia, errores). Las métricas de calidad requieren configurar jueces/monitoreo explícitamente."
},
{
  id: 93, topic: "eval",
  q: "A Generative AI Engineer is developing an internal Retrieval-Augmented Generation (RAG) chatbot for the support team to query product documentation. The engineer recognizes the need for continuous monitoring of response quality once the system is in production. This quality monitoring will involve analyzing response text, model inputs, and the parameters used to generate responses.\nWhich approach would most effectively enable the engineer to monitor the chatbot's quality?",
  opts: [
    ["Enable inference tables and display key metrics from the logged request/response pairs in a dashboard.", "Correcta: logging automático de entradas, salidas y parámetros + dashboard."],
    ["Implement logging of request/response pairs within the model and ingest the logs from stdout into a table that can be visualized in a dashboard.", "Solución manual, frágil y con más mantenimiento."],
    ["Develop a proxy service that logs requests to the model endpoint and displays this data in a dashboard.", "Infraestructura extra y solo captura peticiones."],
    ["Regularly survey users about their experience with the chatbot to assess its quality.", "Subjetivo, no continuo ni técnico."]
  ],
  ans: "A",
  exp: "Las Inference Tables registran automáticamente cada request/response (incluyendo parámetros) en Delta; sobre ellas se construyen dashboards y monitores de calidad continuos."
},
{
  id: 94, topic: "data",
  q: "A Generative AI Engineer is working on a RAG application for an architecture firm that has many similarly structured building plan documents. They find that architects are asking questions about a specific building, but the system is currently providing responses about the wrong buildings. They have a list of approaches that may resolve the issue but have limited time and must immediately discard any that will not be effective.\nWhich approach do they discard?",
  opts: [
    ["Fine tune the response generating LLM on thousands of similar documents", "Correcta (se descarta): el fallo está en la recuperación, no en la generación."],
    ["Increase number of retrieved documents and add a reranker", "Útil: más candidatos + mejor ordenación."],
    ["Use hybrid search to include building metadata like site name", "Útil: el nombre del sitio desambigua entre edificios."],
    ["Fine tune the embedding model on thousands of similar documents", "Útil: mejora la distinción semántica entre documentos parecidos."]
  ],
  ans: "A",
  exp: "Si se recupera el edificio equivocado, el problema está en la recuperación. Afinar el LLM generador no cambia qué documentos llegan al prompt."
},
{
  id: 95, topic: "data",
  q: "A Generative AI Engineer has deployed a RAG application that processes technical documentation - including API specs, troubleshooting guides, and product manuals - for a customer support system. The application currently uses uniform chunks of 512 tokens with 50-token overlap. Users report receiving fragmented responses that miss critical context. They need to choose an approach that can address this issue while maintaining query response time.\nWhich approach do they choose?",
  opts: [
    ["Implement semantic chunking with windowed summarization.", "Mejora contexto, pero el resumen añade coste/latencia."],
    ["Implement hierarchical chunking based on document headers.", "Correcta: respeta la estructura (secciones) sin coste extra en consulta."],
    ["Increase the fixed chunk size to 1024 tokens.", "Sigue cortando en límites arbitrarios."],
    ["Add more overlap between existing fixed-size chunks.", "Más redundancia sin resolver la fragmentación semántica."]
  ],
  ans: "B",
  exp: "La documentación técnica está organizada por encabezados. Trocear jerárquicamente por secciones mantiene unidades lógicas completas y no añade latencia en la consulta."
},
{
  id: 96, topic: "dev",
  q: "A Generative AI Engineer is part of a team developing an AI-powered web analyst advisor agent. This agent will provide personalized guidance and recommendations to web development teams on how to optimize their content for better engagement and monetization. It's crucial that system be flexible and adapt its approach based on various contexts and tasks, without relying on a static repository of prompts. To fulfill these requirements for dynamic adaptation and context-dependent prompting, they need to select the correct framework that can support this.\nWhich framework do they select?",
  opts: [
    ["DSPy", "Correcta: programación declarativa que optimiza prompts automáticamente."],
    ["LangChain", "Orquesta cadenas, pero los prompts suelen ser plantillas estáticas."],
    ["Llamaindex", "Enfocado en indexado y recuperación de datos."],
    ["Haystack", "Enfocado en pipelines de búsqueda/QA."]
  ],
  ans: "A",
  exp: "DSPy define módulos con firmas declarativas y usa optimizadores para generar y ajustar prompts automáticamente según datos y métricas, en vez de mantener prompts escritos a mano."
},
{
  id: 97, topic: "data",
  q: "A Generative AI Engineer is integrating Mosaic AI Vector Search into a Retrieval-Augmented Generation (RAG) system. The source data, comprising simple text entries, is stored in a Delta table. To simplify the workflow, the engineer plans to use an embedding model served via Mosaic AI Model Serving endpoint to automatically compute embeddings during data synchronization from the Delta table to the vector search index.\nWhich method should the engineer use to achieve this integration?",
  opts: [
    ["Delta sync index with managed embeddings", "Correcta: sincroniza desde Delta y calcula embeddings con el endpoint indicado."],
    ["Delta sync index with self-managed embeddings", "Requiere precalcular los embeddings tú mismo."],
    ["Direct vector access index", "Escribes los vectores manualmente; sin sincronización automática."],
    ["Hybrid embedding computing", "No es un tipo de índice de Mosaic AI Vector Search."]
  ],
  ans: "A",
  exp: "Un Delta Sync Index con managed embeddings toma una columna de texto, llama al endpoint de embeddings de Model Serving y mantiene el índice sincronizado con la tabla Delta automáticamente."
},
{
  id: 98, topic: "data",
  q: "A Generative AI Engineer has been asked to create an AI system that can answer questions of a company's PDF knowledge base, but many of the PDFs have diagrams in them. The engineer is considering two approaches:\n• Option 1: Using an image captioning model to generate text descriptions of diagrams and embedding those alongside the text components of the PDFs\n• Option 2: Using a multimodal model like CLIP to embed the diagrams and text components of the PDFs to a shared vector space\nThe engineer needs to evaluate the tradeoffs of these two model options to choose their approach.\nWhich statement correctly reflects the tradeoffs?",
  opts: [
    ["Option 1 is simpler due to use of standard text pipelines, but is strictly reliant on the caption accuracy. Option 2 is more flexible in query modality, but can be more expensive due to infrastructure requirements", "Correcta: refleja bien simplicidad vs. dependencia del caption, y flexibilidad vs. coste."],
    ["Option 1 is natively supported via Delta Sync API, but the accuracy will be harder to maintain due to multiple embeddings. Option 2 is simpler to maintain due to unified embedding model, but isn't natively supported by Delta Sync API", "Mezcla afirmaciones sobre Delta Sync que no son el trade-off relevante."],
    ["Option 1 is more accurate due to the strength of text embedding models, but the multi-step embedding process isn't natively supported by Delta Sync API. Option 2 has a singular embedding model and is therefore natively supported by Delta Sync API, but multimodal embedding models are weaker for retrieval", "Afirmaciones imprecisas sobre soporte y precisión."],
    ["Option 1 is higher quality due to the relative performance of text-only embedding models, but is more expensive due to the multiple embedding models. Option 2 is cheaper due to the single embedding model, but won't perform as well in multimodal settings because of the limited visual information Embedded", "Invierte el trade-off: lo multimodal es justamente la fortaleza de CLIP."]
  ],
  ans: "A",
  exp: "Captioning convierte todo a texto y reutiliza el pipeline estándar (simple), pero la calidad depende de los captions. CLIP permite consultas en varias modalidades, a costa de más infraestructura."
},
{
  id: 99, topic: "eval",
  q: "Databricks offers a number of built in AI judges that provide metrics and rationale for different types of quality issues a Gen AI application may have.\nWhich of the following pairs of judges both require a ground truth label in the evaluation dataset field expected_response to execute?",
  opts: [
    ["correctness, groundedness", "Groundedness compara la respuesta con el contexto recuperado, no con ground truth."],
    ["guideline_adherence, chunk_relevance", "Ninguno requiere expected_response."],
    ["relevance_to_query, chunk_relevance", "Ninguno requiere expected_response."],
    ["context_sufficiency, correctness", "Correcta: ambos comparan contra la respuesta esperada."]
  ],
  ans: "D",
  exp: "Correctness compara la respuesta con expected_response; context_sufficiency comprueba si el contexto recuperado basta para producir esa respuesta esperada. Los demás jueces no necesitan ground truth."
},
{
  id: 100, topic: "design",
  q: "A company receives product reviews from their online store and from social media. The reviews come in many formats. The company needs to understand which product is being referenced in each review to improve their customer service. One of their data scientists designs an offline batch application using GenAI that will extract all product references from each review.\nWhich component is least useful for the application?",
  opts: [
    ["Vector search", "Correcta (menos útil): es una tarea de extracción en batch, no de recuperación."],
    ["Few-shot examples", "Útil: enseña al modelo qué extraer en formatos variados."],
    ["Return schema", "Útil: salida estructurada y consistente."],
    ["Prompt template", "Útil: instrucciones consistentes y reproducibles."]
  ],
  ans: "A",
  exp: "Extraer referencias a productos de cada reseña es una tarea de extracción sobre el propio texto. Prompt template, few-shot y esquema de salida son clave; la búsqueda vectorial aporta poco."
},
{
  id: 101, topic: "deploy",
  q: "A company has about one million IT tickets in plain-text saved to a table in Unity Catalog. They want to both analyze the resolution and root cause analysis of the issue as well as extract various components from the text such as the ticket subject, time to resolution, and assigned engineer, using Llama 3.3 70B or a similar sized model, and then they want to save those extracted fields to their own columns in the same SQL table for further downstream analytics.\nWhich of the following strategies will be the most cost and time effective assuming about 250 tokens per ticket?",
  opts: [
    ["ai_query () calling a Provisioned Throughput endpoint", "Capacidad reservada; según el PDF, más cara para una tarea puntual."],
    ["ai_query() calling a Pay-per-Token endpoint", "Correcta (según el PDF): pagas solo los tokens procesados, sin infraestructura."],
    ["ai_query() calling a custom GPU model serving endpoint", "Más complejidad de despliegue y gestión."],
    ["Databricks notebook with the model loaded directly on a 8xA10 cluster", "Cluster caro, carga del modelo y gestión manual."]
  ],
  ans: "B",
  exp: "ai_query() desde SQL permite procesar y escribir columnas directamente en la tabla. Para un trabajo puntual de ~250M tokens, el PDF considera pay-per-token lo más rentable al no reservar capacidad.",
  note: "Respuesta debatida: la documentación de Databricks recomienda provisioned throughput para batch inference a gran escala con ai_query. Se toma la del PDF."
},
{
  id: 102, topic: "gov",
  q: "Generative AI guardrails can be implemented inside-the-model (during training or fine-tuning), or at inference time, either on input tokens or output tokens.\nWhere does Mosaic AI Gateway implement guardrails and what is a benefit to this type of implementation?",
  opts: [
    ["At inference time, Faster Iteration: implementing on input or output tokens requires no model retraining", "Correcta: se configuran en el gateway sin reentrenar."],
    ["At inference time, Decreased Latency: by moving the guardrail logic outside of the model and into a separate guardrail call the over all latency is always reduced.", "Una verificación extra no reduce “siempre” la latencia; suele añadirla."],
    ["Inside-the-model, Efficiency: inside-the-model guardrails reduces dependency on additional layers of processing during inference lowering latency", "AI Gateway no modifica el modelo."],
    ["Inside-the-model, Ease of deployment: inside-the-model guardrails operate independently across different applications without the need for external guardrails", "AI Gateway no implementa guardrails dentro del modelo."]
  ],
  ans: "A",
  exp: "Mosaic AI Gateway aplica guardrails en inferencia (sobre entradas y salidas). Se pueden cambiar o actualizar sin reentrenar el modelo, lo que acelera la iteración."
},
{
  id: 103, topic: "deploy",
  q: "A Generative AI Engineer has written the following code snippet in the driver notebook using the Mosaic AI Agent Framework.\nHowever, the resources are not being logged. Which aspect of their code is causing this?",
  code: `# Fragmento representativo (el PDF no incluye la imagen del código)
with mlflow.start_run():
    logged_agent_info = mlflow.pyfunc.log_model(
        python_model="agent.py",
        artifact_path="agent",
        model_config="config.yml",
        input_example=input_example,
    )`,
  opts: [
    ["The code is missing the required resources parameter to specify dependencies like vector search index and serving endpoints", "Correcta: hay que declarar resources=[DatabricksVectorSearchIndex(...), DatabricksServingEndpoint(...)]."],
    ["There is no issue with their code; PyFunc automatically detects resources like LangChain", "PyFunc no detecta automáticamente los recursos externos."],
    ["Resources cannot be logged with PyFunc models", "Sí se pueden, mediante el parámetro resources."],
    ["The issue is in the artifact_path parameter which should contain resource information", "artifact_path solo indica dónde se guardan los artefactos."]
  ],
  ans: "A",
  exp: "Con modelos PyFunc hay que declarar explícitamente las dependencias (índices de Vector Search, endpoints) en el parámetro resources de log_model para que Databricks configure la autenticación automática al desplegar.",
  note: "El PDF no incluye la imagen del código; el fragmento mostrado es una reconstrucción representativa."
},
{
  id: 104, topic: "data",
  q: "A Generative AI Engineer processes PDF files by parsing the text, dividing it into chunks, and storing the computed embeddings in a Delta table designated as the source table. However, when attempting to create a Mosaic AI Vector Index based on this source table, the index creation fails. They need to consider the most likely cause for the failure.\nWhich is the most likely cause?",
  opts: [
    ["Change Data Feed (CDF) is not enabled for the source table.", "Correcta: un Delta Sync Index requiere CDF en la tabla fuente."],
    ["The sync mode is set to “Triggered.”", "Triggered es un modo válido."],
    ["The embedding column to be synced must be a string instead of precomputed embeddings.", "Se admiten embeddings precalculados (self-managed)."],
    ["The embedding model to be used is not defined.", "Con embeddings precalculados no hace falta modelo."]
  ],
  ans: "A",
  exp: "Para crear un índice Delta Sync, la tabla fuente debe tener habilitado Change Data Feed (delta.enableChangeDataFeed = true); sin él la creación falla."
},
{
  id: 105, topic: "gov",
  q: "A Data Engineer is configuring a Model Serving Endpoint that the Data Science team will use to interact with an external, proprietary Large Language Model (LLM). The Data Engineer wants to implement a mechanism to control costs associated with using the external model.\nWhich mechanism would most effectively control costs using Databricks-native features?",
  opts: [
    ["Add a limit to the number of output tokens returned by the LLM", "Reduce el tamaño de cada respuesta, pero no el volumen de uso."],
    ["Define and enforce an appropriate rate limit, measured by queries per minute, for the data science group's usage of the model serving endpoint", "Correcta: rate limits nativos de AI Gateway por usuario/grupo."],
    ["Define a monthly budget for the endpoint and disable the endpoint when the budget is exceeded", "No es una función nativa de apagado automático por presupuesto."],
    ["Turn off the model serving endpoint on nights and weekends when it's not in use", "Manual y poco práctico."]
  ],
  ans: "B",
  exp: "AI Gateway permite definir rate limits (consultas por minuto) por endpoint, usuario o grupo: un control de costes nativo y automático."
},
{
  id: 106, topic: "eval",
  q: "Which of the following statements accurately identifies differences between the evaluation phase and the monitoring phase in the generative AI application lifecycle within Databricks?",
  opts: [
    ["The evaluation phase uses all inference history to assess agent performance and readiness for production, while in the monitoring phase uses only new inference table records to monitor performance.", "La evaluación usa datasets de evaluación, no el historial de inferencias."],
    ["The evaluation phase uses Mosaic AI Agent Evaluation and an evaluation dataset to assess an agent's performance metrics and traces, while the monitoring phase relies on inference tables as source data for creating a metrics profile.", "Correcta: evaluación offline con dataset; monitoreo sobre inference tables de producción."],
    ["The evaluation phase ensures the agent's responses comply with business rules in production, whereas the monitoring phase is focused on SLA and performance metrics.", "La evaluación ocurre antes de producción."],
    ["The evaluation phase logs and traces live API calls in production, while the monitoring phase runs metrics on inference tables containing those traces.", "Registrar llamadas en vivo es parte del monitoreo, no de la evaluación."]
  ],
  ans: "B",
  exp: "Evaluación = antes de producción, con Agent Evaluation sobre un dataset de evaluación. Monitoreo = en producción, con las inference tables como fuente para perfiles de métricas."
},
{
  id: 107, topic: "data",
  q: "A Generative AI Engineer is developing a large-scale RAG application that requires processing millions of HTML documents from a company's website. The document contains product descriptions with nested sections, pricing tables, and user reviews. The system needs to:\n• Support semantic search across product features\n• Preserve price comparison tables\n• Handle frequent document updates\n• Process 100,000 documents per hour\n• Maintain contextual relationships between product descriptions and reviews\nThey need to select a chunking strategy that would optimize both search relevance and processing speed.\nWhich strategy do they select?",
  opts: [
    ["Process the HTML using recursive tag-based chunking that splits on semantic elements, with separate embedding pipelines for tabular and textual content.", "Correcta: respeta la estructura HTML, preserva tablas y es rápido."],
    ["Convert HTML to structured JSON objects, chunk based on logical product sections, and maintain cross-references between related chunks using metadata.", "Conversión y referencias cruzadas añaden mucho overhead a esta escala."],
    ["Use a Recursive TextSplitter with max chunk size of 512 tokens.", "Ignora la estructura y rompe tablas."],
    ["Use an LLM to analyze and summarize each HTML section before chunking, storing both the summary and original content.", "Demasiado lento y caro para 100.000 docs/hora."]
  ],
  ans: "A",
  exp: "Chunking recursivo por etiquetas HTML semánticas preserva secciones y tablas; procesar tablas y texto con pipelines distintos mejora la relevancia sin el coste de un LLM por documento."
},
{
  id: 108, topic: "data",
  q: "A Generative AI Engineer is working on a RAG application that is heavily based on data scraped from the web and they're encountering two main problems:\n• the data is taking up much more space in the vector database than expected\n• performance has been much worse than expected.\nWhich cause explains both issues?",
  opts: [
    ["The scraped data is in HTML format and should be converted to plain text before chunking and embedding", "Añade ruido, pero no es la causa principal del tamaño de los vectores."],
    ["The chunk size and chunking overlap window are too small resulting in lost context between chunks", "Afecta la calidad, no explica el exceso de almacenamiento."],
    ["The embedding model dimension is too large for the application and a smaller model would be more efficient", "Correcta: más dimensiones = más espacio por vector y búsquedas más lentas."],
    ["The engineer is using a summarizer on too small of chunks, resulting in longer summaries than the source material", "Escenario poco probable y no explica el problema de búsqueda."]
  ],
  ans: "C",
  exp: "La dimensión del embedding determina el tamaño de cada vector y el coste de las búsquedas de similitud. Una dimensión excesiva explica a la vez el almacenamiento alto y el rendimiento pobre.",
  note: "Respuesta debatida: el HTML sin limpiar también puede inflar el número de chunks y empeorar la calidad. Se toma la del PDF."
},
{
  id: 109, topic: "design",
  q: "A Generative AI Engineer is developing a real time customer support bot that can answer questions about new product features, troubleshooting issues, and inventory or future stocking questions.\nWhich set of tools best allows the bot to address these requirements?",
  opts: [
    ["A RAG agent for the product features and troubleshooting information, plus a Text-to-SQL agent for querying availability from the inventory and stocking database", "Correcta: RAG para documentación + Text-to-SQL para inventario."],
    ["Few shot learning for the product features and troubleshooting information, plus a Feature Store for retrieving availability from the inventory and stocking database", "Few-shot no sirve para grandes bases de conocimiento."],
    ["A retrieval agent for the product features, few shot learning for the troubleshooting information, plus Online Tables for retrieving availability from the inventory and stocking database", "Few-shot no cubre troubleshooting complejo."],
    ["A fine tuned LLM for the product features and troubleshooting information, plus a SQL agent for querying availability from the inventory and stocking database", "Fine-tuning exigiría reentrenar con cada producto nuevo."]
  ],
  ans: "A",
  exp: "Documentación cambiante (features, troubleshooting) → RAG; datos estructurados y vivos (inventario) → Text-to-SQL. Fine-tuning o few-shot no escalan con información nueva."
},
{
  id: 110, topic: "deploy",
  q: "A company selling gourmet mushroom growing supplies has a script that runs once per day to scrape various social media platforms for posts that mention its name. The scraped text data is loaded into a Delta table each night for a downstream processing task that summarizes each post and its sentiment for internal use. Given the small size of the company, they only get a couple hundred posts per day.\nWhich solution best optimizes for cost and ease of implementation?",
  opts: [
    ["Schedule a nightly SQL query with ai_query() calling a Pay-Per-Token endpoint", "Correcta: volumen pequeño + SQL programado = barato y simple."],
    ["Schedule a nightly SQL query with ai_query() calling a Provisioned Throughput endpoint", "Capacidad reservada innecesaria para unos cientos de posts."],
    ["Schedule a nightly job that runs a notebook to download the model locally, process the records, and terminate the cluster", "Más cómputo y complejidad operativa."],
    ["Schedule a nightly job to call OpenAI's batch inference API, save the results, and terminate the cluster", "Integración externa y gestión de cluster innecesarias."]
  ],
  ans: "A",
  exp: "Con unos cientos de posts al día, una consulta SQL nocturna con ai_query() sobre un endpoint pay-per-token es lo más barato y sencillo: sin infraestructura que gestionar."
}
];
