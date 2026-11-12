import type { Subject } from "./types.js";

// Questões: lista de exercícios da disciplina (50 objetivas), transcritas sem alteração.
// Gabarito e flashcards: elaborados a partir dos slides dos capítulos 1 a 6 — não oficiais.
const subject: Subject = {
  "id": "sa",
  "slug": "seguranca-auditoria",
  "name": "Segurança e Auditoria de Sistemas",
  "code": "SA",
  "professor": "Prof. Luan O. da Silva",
  "unitLabel": "Capítulo",
  "answerKey": "derivado",
  "tone": "navy",
  "units": [
    {
      "id": "sa-c1",
      "slug": "capitulo-1",
      "number": 1,
      "title": "Fundamentos da Auditoria de Sistemas",
      "intro": "Partes I a III: auditoria de sistemas e suas abordagens, Governança, Riscos e Conformidade (GRC) e organização do trabalho de auditoria.",
      "questions": [
        {
          "id": "sa-c1-q1",
          "number": 1,
          "kind": "mc",
          "heading": "Questão 1",
          "prompt": "Uma empresa solicita a um auditor independente que avalie se as permissões do sistema financeiro são adequadas. Qual é a principal finalidade desse trabalho?",
          "options": [
            {
              "key": "a",
              "text": "Garantir que nunca ocorrerá uma fraude no ambiente avaliado."
            },
            {
              "key": "b",
              "text": "Desenvolver um novo sistema financeiro antes de concluir a avaliação."
            },
            {
              "key": "c",
              "text": "Assumir a administração diária das permissões do sistema."
            },
            {
              "key": "d",
              "text": "Substituir integralmente os responsáveis pela segurança da organização."
            },
            {
              "key": "e",
              "text": "Avaliar controles e riscos e emitir conclusões fundamentadas em evidências."
            }
          ],
          "answer": "e",
          "gabarito": "Auditoria de SI é uma atividade independente, baseada em controles internos: o auditor confirma se os controles existem e são efetivos e conclui com base em evidências. Ela não garante que fraudes nunca ocorrerão nem assume a gestão do ambiente."
        },
        {
          "id": "sa-c1-q2",
          "number": 2,
          "kind": "mc",
          "heading": "Questão 2",
          "prompt": "Na abordagem de auditoria denominada “ao redor do computador”, o auditor concentra sua análise em:",
          "options": [
            {
              "key": "a",
              "text": "Inspecionar obrigatoriamente cada linha de código-fonte da aplicação."
            },
            {
              "key": "b",
              "text": "Avaliar exclusivamente a configuração de equipamentos de rede."
            },
            {
              "key": "c",
              "text": "Implantar mudanças diretamente no banco de dados de produção."
            },
            {
              "key": "d",
              "text": "Comparar entradas, documentos de origem e saídas, sem examinar detalhadamente o processamento interno."
            },
            {
              "key": "e",
              "text": "Executar programas próprios para reproduzir as transações do sistema."
            }
          ],
          "answer": "d",
          "gabarito": "Na abordagem ao redor do computador, a hipótese é que, se as saídas são condizentes com o esperado, pouco importam os procedimentos lógicos de processamento. Por isso o foco fica em entradas e saídas."
        },
        {
          "id": "sa-c1-q3",
          "number": 3,
          "kind": "mc",
          "heading": "Questão 3",
          "prompt": "Ao examinar regras de cálculo programadas, rotinas de validação e lógica interna de um aplicativo, o auditor está utilizando principalmente a abordagem:",
          "options": [
            {
              "key": "a",
              "text": "Ao redor do computador."
            },
            {
              "key": "b",
              "text": "Baseada exclusivamente em entrevistas."
            },
            {
              "key": "c",
              "text": "Sem utilização do computador."
            },
            {
              "key": "d",
              "text": "Através do computador."
            },
            {
              "key": "e",
              "text": "Limitada ao exame documental externo."
            }
          ],
          "answer": "d",
          "gabarito": "A abordagem através do computador envolve a análise dos componentes de software, como regras de cálculo, validações e lógica interna."
        },
        {
          "id": "sa-c1-q4",
          "number": 4,
          "kind": "mc",
          "heading": "Questão 4",
          "prompt": "Um auditor utiliza um programa para importar milhares de registros de vendas e identificar transações duplicadas. Esse procedimento caracteriza a abordagem:",
          "options": [
            {
              "key": "a",
              "text": "Com o computador, utilizando uma técnica assistida por computador."
            },
            {
              "key": "b",
              "text": "Exclusivamente administrativa, sem relação com auditoria de SI."
            },
            {
              "key": "c",
              "text": "Ao redor do computador, sem qualquer automação."
            },
            {
              "key": "d",
              "text": "De certificação automática da inexistência de fraudes."
            },
            {
              "key": "e",
              "text": "Apenas através do computador, pois requer acesso ao código-fonte."
            }
          ],
          "answer": "a",
          "gabarito": "A abordagem com o computador executa tarefas de auditoria de forma automatizada, importando e analisando dados dos sistemas com técnicas assistidas por computador (CAAT)."
        },
        {
          "id": "sa-c1-q5",
          "number": 5,
          "kind": "mc",
          "heading": "Questão 5",
          "prompt": "Na fase de planejamento, por que o auditor deve compreender o processo de negócio antes de selecionar os testes?",
          "options": [
            {
              "key": "a",
              "text": "Porque os controles da área de TI são sempre idênticos entre organizações."
            },
            {
              "key": "b",
              "text": "Porque toda auditoria deve se limitar aos processos mais baratos de testar."
            },
            {
              "key": "c",
              "text": "Porque o conhecimento do negócio elimina a necessidade de evidências."
            },
            {
              "key": "d",
              "text": "Porque o auditor deve aprovar pessoalmente todas as operações do setor."
            },
            {
              "key": "e",
              "text": "Porque os processos de negócio permitem identificar sistemas críticos e riscos relevantes."
            }
          ],
          "answer": "e",
          "gabarito": "Compreender o negócio e entender os processos estão entre as tarefas do auditor: é assim que ele caracteriza o risco organizacional e identifica os sistemas críticos antes de escolher os testes."
        },
        {
          "id": "sa-c1-q6",
          "number": 6,
          "kind": "mc",
          "heading": "Questão 6",
          "prompt": "Em uma auditoria de TI, o “escopo” é a definição:",
          "options": [
            {
              "key": "a",
              "text": "Da lista de fornecedores que serão contratados após a auditoria."
            },
            {
              "key": "b",
              "text": "Das decisões que o auditor poderá impor sem consultar a direção."
            },
            {
              "key": "c",
              "text": "Dos processos, sistemas, locais e períodos que serão examinados, bem como de seus limites."
            },
            {
              "key": "d",
              "text": "Do conjunto de punições aplicadas aos colaboradores da área auditada."
            },
            {
              "key": "e",
              "text": "Da garantia de que todos os sistemas da empresa serão examinados."
            }
          ],
          "answer": "c",
          "gabarito": "O planejamento (S5) define natureza, objetivos, calendário e âmbito da auditoria. O escopo diz o que será examinado e até onde vai o trabalho."
        },
        {
          "id": "sa-c1-q7",
          "number": 7,
          "kind": "mc",
          "heading": "Questão 7",
          "prompt": "Um relatório afirma que “não foram encontradas falhas nos controles testados.” Qual conclusão é tecnicamente mais adequada?",
          "options": [
            {
              "key": "a",
              "text": "O relatório dispensa descrição dos testes realizados."
            },
            {
              "key": "b",
              "text": "A inexistência de achados transforma a auditoria em gestão operacional."
            },
            {
              "key": "c",
              "text": "A organização está definitivamente livre de ameaças e vulnerabilidades."
            },
            {
              "key": "d",
              "text": "É possível afirmar que todos os controles não avaliados são eficazes."
            },
            {
              "key": "e",
              "text": "O resultado está limitado aos controles, período, amostra e procedimentos efetivamente examinados."
            }
          ],
          "answer": "e",
          "gabarito": "Pelo padrão S7, o relatório indica âmbito, período de cobertura, natureza e extensão do trabalho e as limitações de escopo. A conclusão vale apenas para o que foi efetivamente testado."
        },
        {
          "id": "sa-c1-q8",
          "number": 8,
          "kind": "mc",
          "heading": "Questão 8",
          "prompt": "O modelo GRC integra três dimensões para apoiar a gestão organizacional. Quais são elas?",
          "options": [
            {
              "key": "a",
              "text": "Gestão de arquivos, relatórios e custos."
            },
            {
              "key": "b",
              "text": "Garantia de hardware, registros e contratos."
            },
            {
              "key": "c",
              "text": "Gerência de sistemas, recursos e comunicação."
            },
            {
              "key": "d",
              "text": "Gestão de projetos, redes e computação."
            },
            {
              "key": "e",
              "text": "Governança, riscos e conformidade."
            }
          ],
          "answer": "e",
          "gabarito": "GRC é a sigla de Governança (Governance), Riscos (Risks) e Conformidade (Compliance)."
        },
        {
          "id": "sa-c1-q9",
          "number": 9,
          "kind": "mc",
          "heading": "Questão 9",
          "prompt": "Uma organização estabelece comitês decisórios, políticas e responsabilidades para alinhar a TI às metas institucionais. Essa iniciativa se relaciona sobretudo a:",
          "options": [
            {
              "key": "a",
              "text": "Auditoria de notas fiscais."
            },
            {
              "key": "b",
              "text": "Governança de TI."
            },
            {
              "key": "c",
              "text": "Processamento de arquivos de entrada."
            },
            {
              "key": "d",
              "text": "Recuperação emergencial de dados."
            },
            {
              "key": "e",
              "text": "Eliminação de todos os riscos do negócio."
            }
          ],
          "answer": "b",
          "gabarito": "Governança é a forma como as decisões corporativas são tomadas, com políticas e procedimentos internos. Na TI, ela alinha os ativos de TI aos objetivos da organização."
        },
        {
          "id": "sa-c1-q10",
          "number": 10,
          "kind": "mc",
          "heading": "Questão 10",
          "prompt": "Uma empresa verifica se o tratamento de dados pessoais atende às exigências legais e às políticas internas. O principal componente de GRC envolvido é:",
          "options": [
            {
              "key": "a",
              "text": "Disponibilidade física."
            },
            {
              "key": "b",
              "text": "Conformidade."
            },
            {
              "key": "c",
              "text": "Análise de desempenho de hardware."
            },
            {
              "key": "d",
              "text": "Otimização de consultas."
            },
            {
              "key": "e",
              "text": "Programação de sistemas."
            }
          ],
          "answer": "b",
          "gabarito": "Conformidade (compliance) é obedecer às normas e legislações instituídas. Na área de TI, os slides citam a LGPD e a Lei de Acesso à Informação."
        },
        {
          "id": "sa-c1-q11",
          "number": 11,
          "kind": "mc",
          "heading": "Questão 11",
          "prompt": "Um conselho deseja avaliar se os processos e investimentos em TI agregam valor e se alinham aos objetivos da organização. Qual referência abordada nos slides é especialmente apropriada?",
          "options": [
            {
              "key": "a",
              "text": "Uma ferramenta de edição de imagens."
            },
            {
              "key": "b",
              "text": "Uma linguagem de marcação de páginas web."
            },
            {
              "key": "c",
              "text": "COBIT."
            },
            {
              "key": "d",
              "text": "Somente o protocolo HTTP."
            },
            {
              "key": "e",
              "text": "Uma solução de armazenamento pessoal sem governança."
            }
          ],
          "answer": "c",
          "gabarito": "O COBIT atua no nível estratégico da TI, para alinhar TI e negócio e mensurar o desempenho da organização."
        },
        {
          "id": "sa-c1-q12",
          "number": 12,
          "kind": "mc",
          "heading": "Questão 12",
          "prompt": "A gerência de TI deseja aperfeiçoar a qualidade e a entrega de serviços aos usuários internos e externos. Segundo os slides, uma referência diretamente relacionada é:",
          "options": [
            {
              "key": "a",
              "text": "ITIL."
            },
            {
              "key": "b",
              "text": "Apenas a Lei de Benford."
            },
            {
              "key": "c",
              "text": "Um aplicativo de desenho técnico."
            },
            {
              "key": "d",
              "text": "Um algoritmo de compressão de arquivos."
            },
            {
              "key": "e",
              "text": "O modelo de teste integrado em produção."
            }
          ],
          "answer": "a",
          "gabarito": "A ITIL é voltada ao gerenciamento de serviços de TI e busca melhorar a prestação de serviços aos clientes internos e externos."
        },
        {
          "id": "sa-c1-q13",
          "number": 13,
          "kind": "mc",
          "heading": "Questão 13",
          "prompt": "Qual situação demonstra melhor a integração entre governança, risco e conformidade?",
          "options": [
            {
              "key": "a",
              "text": "O setor jurídico revisa a legislação, mas proíbe qualquer análise de processos."
            },
            {
              "key": "b",
              "text": "A empresa elimina relatórios para tornar mais rápido o processo decisório."
            },
            {
              "key": "c",
              "text": "A equipe compra equipamentos sem critérios e ignora riscos de implantação."
            },
            {
              "key": "d",
              "text": "O auditor corrige sozinho os sistemas e dispensa registros de decisão."
            },
            {
              "key": "e",
              "text": "Uma direção aprova políticas, avalia riscos de vazamento e verifica atendimento às normas aplicáveis."
            }
          ],
          "answer": "e",
          "gabarito": "A alternativa reúne as três dimensões: políticas aprovadas pela direção (governança), avaliação de riscos de vazamento (riscos) e verificação das normas aplicáveis (conformidade)."
        },
        {
          "id": "sa-c1-q14",
          "number": 14,
          "kind": "mc",
          "heading": "Questão 14",
          "prompt": "Uma empresa identificou servidores obsoletos e colaboradores sem treinamento. Esses fatores devem ser tratados principalmente como:",
          "options": [
            {
              "key": "a",
              "text": "Questões exclusivamente contábeis e alheias à gestão de TI."
            },
            {
              "key": "b",
              "text": "Motivos para suspender permanentemente todas as operações de TI."
            },
            {
              "key": "c",
              "text": "Fontes de risco que precisam ser avaliadas e priorizadas conforme seu possível efeito no negócio."
            },
            {
              "key": "d",
              "text": "Evidências suficientes de que uma fraude já foi praticada."
            },
            {
              "key": "e",
              "text": "Provas de que os controles internos não são necessários."
            }
          ],
          "answer": "c",
          "gabarito": "Software legado, problemas de hardware e colaboradores sem treinamento são exemplos de riscos de TI nos slides. A gestão de riscos os identifica, avalia, prioriza e trata."
        }
      ],
      "flashcards": [
        {
          "id": "sa-c1-f1",
          "number": 1,
          "front": "Quais são as três abordagens de auditoria de SI (Imoniana, 2017)?",
          "back": "Ao redor do computador, através do computador e com o computador."
        },
        {
          "id": "sa-c1-f2",
          "number": 2,
          "front": "Abordagem **ao redor do computador**",
          "back": "Hipótese: se as saídas são condizentes com o esperado, pouco importam os procedimentos lógicos de processamento. Exige pouco conhecimento de TI e tem custo baixo, mas não mostra como os dados são manipulados e tem elevado grau de risco."
        },
        {
          "id": "sa-c1-f3",
          "number": 3,
          "front": "Abordagem **através do computador**",
          "back": "Envolve a análise de componentes de software. Exige melhor conhecimento técnico do auditor e capacitação constante, com custos de treinamento e de softwares."
        },
        {
          "id": "sa-c1-f4",
          "number": 4,
          "front": "Abordagem **com o computador**",
          "back": "Execução automatizada de tarefas de auditoria: importação e análise de dados, verificação de fórmulas e transações e uso de CAAT (Computer Assisted Audit Techniques), com ganho de tempo."
        },
        {
          "id": "sa-c1-f5",
          "number": 5,
          "front": "Qual é o papel do auditor diante dos controles internos?",
          "back": "Confirmar se os controles internos foram implementados e/ou existem e, caso existam, se são efetivos. Exemplos: Política de Segurança da Informação, Política de Backup, Política de Continuidade de Negócios."
        },
        {
          "id": "sa-c1-f6",
          "number": 6,
          "front": "O que é GRC?",
          "back": "Governança, Riscos e Conformidade (Compliance): um modelo integrado para interpretar leis, regulamentos e padrões e avaliar de forma padronizada a saúde organizacional."
        },
        {
          "id": "sa-c1-f7",
          "number": 7,
          "front": "Governança (no GRC)",
          "back": "Forma como as decisões corporativas são tomadas pelos gestores e líderes, com políticas e procedimentos internos. Não há norma específica, mas há boas práticas: COBIT, ITIL, PMBOK."
        },
        {
          "id": "sa-c1-f8",
          "number": 8,
          "front": "Risco × Conformidade (no GRC)",
          "back": "Risco: efeito da incerteza frente aos objetivos da organização (ISO 31000). Conformidade: obedecer às normas e legislações, com revisão contínua das operações (ISO 19600; na TI, LGPD e Lei de Acesso à Informação)."
        },
        {
          "id": "sa-c1-f9",
          "number": 9,
          "front": "COBIT × ITIL",
          "back": "COBIT: nível estratégico, alinhamento entre TI e negócio e mensuração de desempenho. ITIL: gerenciamento de serviços de TI, com boas práticas para melhorar o serviço a clientes internos e externos."
        },
        {
          "id": "sa-c1-f10",
          "number": 10,
          "front": "O que a norma de auditoria (metodologia ISACA) prevê?",
          "back": "Planejamento, avaliação de riscos, supervisão e controle de qualidade, avaliação dos controles internos, documentação de auditoria e avaliação da continuidade de negócio."
        },
        {
          "id": "sa-c1-f11",
          "number": 11,
          "front": "Por que registrar as informações da auditoria?",
          "back": "Formulários, e-mails, entrevistas, testes e provas documentais devem ficar registrados de forma autossuficiente: isso melhora o planejamento das próximas auditorias e facilita o follow-up."
        }
      ]
    },
    {
      "id": "sa-c2",
      "slug": "capitulo-2",
      "number": 2,
      "title": "Padrões e Códigos de Ética para Auditoria",
      "intro": "Normas internacionais de auditoria (ISA) e os padrões ISACA, de S1 a S13.",
      "questions": [
        {
          "id": "sa-c2-q15",
          "number": 15,
          "kind": "mc",
          "heading": "Questão 15",
          "prompt": "Uma carta de compromisso de auditoria bem elaborada deve esclarecer, entre outros pontos:",
          "options": [
            {
              "key": "a",
              "text": "As senhas pessoais de todos os colaboradores."
            },
            {
              "key": "b",
              "text": "O resultado final antes do início dos testes."
            },
            {
              "key": "c",
              "text": "A obrigação do auditor de corrigir todas as falhas identificadas."
            },
            {
              "key": "d",
              "text": "Objetivo, responsabilidades, autoridade e limites do trabalho."
            },
            {
              "key": "e",
              "text": "A dispensa de comunicação com a organização auditada."
            }
          ],
          "answer": "d",
          "gabarito": "Pelo padrão S1, a carta de intenção ou de compromisso define propósito, responsabilidade, autoridade e incumbências da auditoria, além de suas limitações."
        },
        {
          "id": "sa-c2-q16",
          "number": 16,
          "kind": "mc",
          "heading": "Questão 16",
          "prompt": "Um profissional é convidado a auditar a aplicação cujo controle de acesso ele próprio desenvolveu e continua administrando. O principal problema é:",
          "options": [
            {
              "key": "a",
              "text": "Ausência de relação entre o trabalho e o risco organizacional."
            },
            {
              "key": "b",
              "text": "Proibição de auditar sistemas com autenticação."
            },
            {
              "key": "c",
              "text": "Possível comprometimento da independência e da objetividade do auditor."
            },
            {
              "key": "d",
              "text": "Ausência obrigatória de conhecimento técnico sobre o sistema."
            },
            {
              "key": "e",
              "text": "Impossibilidade de documentar o código-fonte analisado."
            }
          ],
          "answer": "c",
          "gabarito": "O padrão S2 exige que o auditor seja independente do auditado, em atitude e em hierarquia. Auditar o próprio trabalho compromete essa independência."
        },
        {
          "id": "sa-c2-q17",
          "number": 17,
          "kind": "mc",
          "heading": "Questão 17",
          "prompt": "Um auditor encontra informações sigilosas durante a revisão de contratos de TI. A conduta mais compatível com a ética profissional é:",
          "options": [
            {
              "key": "a",
              "text": "Enviar cópias indiscriminadamente a interessados externos."
            },
            {
              "key": "b",
              "text": "Alterar os documentos originais para ocultar a descoberta."
            },
            {
              "key": "c",
              "text": "Publicar as senhas encontradas para acelerar a correção."
            },
            {
              "key": "d",
              "text": "Preservar a confidencialidade e utilizar os dados apenas para as finalidades autorizadas."
            },
            {
              "key": "e",
              "text": "Compartilhar os dados em redes sociais para demonstrar transparência."
            }
          ],
          "answer": "d",
          "gabarito": "O padrão S3 pede adesão ao Código de Ética da ISACA, com zelo profissional e o mais alto grau de integridade, sem métodos ilegais ou antiéticos."
        },
        {
          "id": "sa-c2-q18",
          "number": 18,
          "kind": "mc",
          "heading": "Questão 18",
          "prompt": "Antes de examinar a configuração de um firewall complexo, a equipe percebe que não possui a competência técnica necessária. O procedimento adequado é:",
          "options": [
            {
              "key": "a",
              "text": "Excluir o firewall do escopo sem registrar a mudança."
            },
            {
              "key": "b",
              "text": "Emitir um parecer favorável mesmo sem testes."
            },
            {
              "key": "c",
              "text": "Desativar o firewall para simplificar os testes."
            },
            {
              "key": "d",
              "text": "Aceitar a opinião do fornecedor como prova definitiva."
            },
            {
              "key": "e",
              "text": "Buscar capacitação ou apoio de especialista, preservando a responsabilidade pela conclusão da auditoria."
            }
          ],
          "answer": "e",
          "gabarito": "Pelo S4, sem conhecimento compatível o auditor deve buscar a competência ou retirar-se. O S12 permite usar o trabalho de outros especialistas, desde que o auditor o avalie e responda pela conclusão."
        },
        {
          "id": "sa-c2-q19",
          "number": 19,
          "kind": "mc",
          "heading": "Questão 19",
          "prompt": "Ao planejar uma auditoria, qual sequência é mais coerente?",
          "options": [
            {
              "key": "a",
              "text": "Redigir o relatório final, aplicar sanções e depois conhecer o sistema."
            },
            {
              "key": "b",
              "text": "Conhecer o negócio, identificar riscos, definir escopo e selecionar testes e evidências."
            },
            {
              "key": "c",
              "text": "Iniciar alterações no ambiente produtivo antes de definir objetivos."
            },
            {
              "key": "d",
              "text": "Selecionar aleatoriamente as conclusões e descartar os controles existentes."
            },
            {
              "key": "e",
              "text": "Escolher apenas as ferramentas, sem considerar riscos ou prioridades."
            }
          ],
          "answer": "b",
          "gabarito": "O planejamento parte do conhecimento do negócio e dos processos, adota uma abordagem baseada em riscos (S5) e só então define escopo, testes e evidências."
        },
        {
          "id": "sa-c2-q20",
          "number": 20,
          "kind": "mc",
          "heading": "Questão 20",
          "prompt": "Registros de configuração, resultados de testes e documentos revisados devem ser mantidos em papéis de trabalho porque:",
          "options": [
            {
              "key": "a",
              "text": "Eliminam a necessidade de supervisão da equipe."
            },
            {
              "key": "b",
              "text": "Dão suporte e rastreabilidade aos procedimentos e às conclusões da auditoria."
            },
            {
              "key": "c",
              "text": "Substituem a necessidade de um relatório para a gestão."
            },
            {
              "key": "d",
              "text": "São úteis apenas quando se encontra fraude criminal."
            },
            {
              "key": "e",
              "text": "Permitem ao auditor alterar evidências após a conclusão."
            }
          ],
          "answer": "b",
          "gabarito": "O padrão S6 exige documentar o trabalho realizado e as evidências que o suportam, de forma completa o suficiente para permitir revisão e verificação."
        },
        {
          "id": "sa-c2-q21",
          "number": 21,
          "kind": "mc",
          "heading": "Questão 21",
          "prompt": "Um achado foi registrado apenas com a frase “o sistema é inseguro”, sem teste, documento ou exemplo. A principal fragilidade desse achado é:",
          "options": [
            {
              "key": "a",
              "text": "Uso indevido de classificação de impacto numérico."
            },
            {
              "key": "b",
              "text": "Presença de recomendação objetiva para a gestão."
            },
            {
              "key": "c",
              "text": "Falta de evidência verificável para sustentar a conclusão."
            },
            {
              "key": "d",
              "text": "Excesso de detalhamento dos procedimentos aplicados."
            },
            {
              "key": "e",
              "text": "Realização de avaliação por pessoa independente."
            }
          ],
          "answer": "c",
          "gabarito": "Pelos padrões S6 e S13, as conclusões precisam de evidência suficiente, confiável e relevante. Uma frase sem teste, documento ou exemplo não sustenta o achado."
        },
        {
          "id": "sa-c2-q22",
          "number": 22,
          "kind": "mc",
          "heading": "Questão 22",
          "prompt": "Após apresentar seu relatório, o auditor verifica se as ações corretivas pactuadas foram implementadas. Essa etapa corresponde a:",
          "options": [
            {
              "key": "a",
              "text": "Acompanhamento das recomendações da auditoria."
            },
            {
              "key": "b",
              "text": "Reinício obrigatório da coleta de dados brutos."
            },
            {
              "key": "c",
              "text": "Substituição da função de governança pela auditoria."
            },
            {
              "key": "d",
              "text": "Desenvolvimento do sistema pela equipe auditora."
            },
            {
              "key": "e",
              "text": "Supressão dos achados do relatório original."
            }
          ],
          "answer": "a",
          "gabarito": "O padrão S8 (atividades de acompanhamento) manda verificar se a administração tomou as ações apropriadas em tempo hábil."
        },
        {
          "id": "sa-c2-q23",
          "number": 23,
          "kind": "mc",
          "heading": "Questão 23",
          "prompt": "Em relação à materialidade de um achado, o auditor deve considerar principalmente:",
          "options": [
            {
              "key": "a",
              "text": "A relevância da deficiência e seus possíveis efeitos sobre os processos e objetivos organizacionais."
            },
            {
              "key": "b",
              "text": "A quantidade de pessoas que compõem a equipe de testes."
            },
            {
              "key": "c",
              "text": "Somente o número de páginas do relatório de auditoria."
            },
            {
              "key": "d",
              "text": "A preferência pessoal do gestor, sem analisar impactos."
            },
            {
              "key": "e",
              "text": "Exclusivamente a idade do equipamento analisado."
            }
          ],
          "answer": "a",
          "gabarito": "Pelo S11, a materialidade considera se a fraqueza ou ausência de controles pode resultar em deficiência significativa nos processos de TI."
        }
      ],
      "flashcards": [
        {
          "id": "sa-c2-f1",
          "number": 1,
          "front": "Padrões × guias (diretrizes) de auditoria",
          "back": "Padrões (normas) são requisitos obrigatórios para o auditor. Guias são orientações detalhadas de como seguir as normas; se não seguir um guia, o auditor deve justificar como fez o trabalho."
        },
        {
          "id": "sa-c2-f2",
          "number": 2,
          "front": "ISA 401",
          "back": "Norma Internacional de Auditoria para auditoria em ambiente de sistema de informação computadorizado. Será retirada quando as ISA 315 e 330 entrarem em vigor."
        },
        {
          "id": "sa-c2-f3",
          "number": 3,
          "front": "S1: Carta de intenção da auditoria",
          "back": "Define propósito, responsabilidade, autoridade e incumbências da auditoria; deve ser aprovada e revisada periodicamente. Auditoria interna: carta de intenções. Externa: carta de compromisso, com propósito e limitações."
        },
        {
          "id": "sa-c2-f4",
          "number": 4,
          "front": "S2: Independência",
          "back": "O auditor deve ser independente do auditado, em atitude e em hierarquia. A independência deve ser avaliada regularmente."
        },
        {
          "id": "sa-c2-f5",
          "number": 5,
          "front": "S3: Ética × S4: Competência",
          "back": "Ética: seguir o Código de Ética da ISACA, com zelo e integridade. Competência: ter habilidades e conhecimento e mantê-los por educação continuada; sem conhecimento compatível, recusar ou retirar-se."
        },
        {
          "id": "sa-c2-f6",
          "number": 6,
          "front": "S5: Planejamento",
          "back": "Abordagem baseada em riscos e documentada; o plano traz natureza, objetivos, calendário, âmbito e recursos. Pode ser ajustado durante a auditoria se surgirem novos riscos."
        },
        {
          "id": "sa-c2-f7",
          "number": 7,
          "front": "S6: Execução do trabalho",
          "back": "Equipe supervisionada; evidência suficiente, confiável e relevante; conclusões apoiadas na análise das evidências; documentação completa para permitir revisão."
        },
        {
          "id": "sa-c2-f8",
          "number": 8,
          "front": "S7: Relatórios × S8: Acompanhamento",
          "back": "Relatório: organização, destinatários, âmbito, objetivos, período, resultados, conclusões, recomendações e limitações; assinado e datado. Acompanhamento: verificar se a administração agiu em tempo hábil ou aceitou o risco."
        },
        {
          "id": "sa-c2-f9",
          "number": 9,
          "front": "S9: Irregularidades × S11: Materialidade",
          "back": "S9: considerar o risco de atos ilícitos e avaliar se uma distorção indica irregularidade. S11: avaliar se a fraqueza ou ausência de controles pode gerar deficiência significativa nos processos de TI."
        },
        {
          "id": "sa-c2-f10",
          "number": 10,
          "front": "S10: Governança × S12: Outros especialistas",
          "back": "S10: avaliar se a TI se alinha à missão, valores e estratégias da organização. S12: verificar qualificação e independência dos especialistas e avaliar o trabalho deles antes de usá-lo."
        },
        {
          "id": "sa-c2-f11",
          "number": 11,
          "front": "S13: Quando a evidência é mais confiável?",
          "back": "Quando é escrita (não oral), obtida de fontes independentes, obtida pelo próprio auditor, e certificada ou mantida por entidade independente."
        }
      ]
    },
    {
      "id": "sa-c3",
      "slug": "capitulo-3",
      "number": 3,
      "title": "Desenvolvimento de Equipe de Auditoria de TI",
      "intro": "Programa de desenvolvimento do auditor: níveis focal, integração e aconselhamento. A lista de exercícios não tem questões deste capítulo; estude pelos flashcards.",
      "questions": [],
      "flashcards": [
        {
          "id": "sa-c3-f1",
          "number": 1,
          "front": "Quais são os três níveis do programa de desenvolvimento do auditor?",
          "back": "Focal, Integração e Aconselhamento, este último no topo da pirâmide."
        },
        {
          "id": "sa-c3-f2",
          "number": 2,
          "front": "Nível **Focal**",
          "back": "A parte mais técnica da formação: consolidam-se métodos, ferramentas e técnicas. Analisa políticas de segurança, controle de acesso, firewalls, logs e criptografia, com uso de CAATs."
        },
        {
          "id": "sa-c3-f3",
          "number": 3,
          "front": "Exemplos de tarefas com CAATs",
          "back": "Consultas a dados, estratificação, extração de amostras, identificação de sequências ausentes, análise estatística, identificação de transações duplicadas e tabelas dinâmicas."
        },
        {
          "id": "sa-c3-f4",
          "number": 4,
          "front": "Lei de Benford",
          "back": "As frequências do primeiro dígito em um conjunto de dados decrescem de 1 a 9: o dígito 1 aparece em cerca de 30% dos valores e o 9 em menos de 5%. É usada na detecção de fraudes."
        },
        {
          "id": "sa-c3-f5",
          "number": 5,
          "front": "Certificações em CAAT",
          "back": "ICCP (ICAEA), ACDA (ACL Services), CIDA (CaseWare IDEA) e JCCP (Jacksoft)."
        },
        {
          "id": "sa-c3-f6",
          "number": 6,
          "front": "Nível **Integração**",
          "back": "Articula as funções de auditoria: controla e monitora recursos, acompanha se os objetivos são alcançados, escolhe auditores com o know-how necessário e observa o desempenho da equipe."
        },
        {
          "id": "sa-c3-f7",
          "number": 7,
          "front": "Nível **Aconselhamento**",
          "back": "Topo da pirâmide: maturidade técnica e experiência. O auditor presta orientação empresarial e pode sugerir mudanças estratégicas no negócio."
        }
      ]
    },
    {
      "id": "sa-c4",
      "slug": "capitulo-4",
      "number": 4,
      "title": "Controles Internos e Avaliação",
      "intro": "Partes I a IV: princípios e tipos de controles internos em TI e o processo de análise de riscos.",
      "questions": [
        {
          "id": "sa-c4-q24",
          "number": 24,
          "kind": "mc",
          "heading": "Questão 24",
          "prompt": "Em um sistema de pagamentos, a mesma pessoa pode cadastrar um favorecido, aprovar e executar a transferência. O princípio de controle interno mais comprometido é:",
          "options": [
            {
              "key": "a",
              "text": "Classificação por criticidade."
            },
            {
              "key": "b",
              "text": "Custos efetivos de implantação."
            },
            {
              "key": "c",
              "text": "Tempestividade de relatórios."
            },
            {
              "key": "d",
              "text": "Disponibilidade operacional."
            },
            {
              "key": "e",
              "text": "Segregação de funções."
            }
          ],
          "answer": "e",
          "gabarito": "A segregação de funções divide responsabilidades incompatíveis entre pessoas diferentes para minimizar a possibilidade de fraudes."
        },
        {
          "id": "sa-c4-q25",
          "number": 25,
          "kind": "mc",
          "heading": "Questão 25",
          "prompt": "Um gerente revisa periodicamente relatórios de exceções e registros de alterações efetuadas pelos operadores. Esse procedimento exemplifica:",
          "options": [
            {
              "key": "a",
              "text": "Supervisão e revisão dos controles."
            },
            {
              "key": "b",
              "text": "Eliminação de toda responsabilidade operacional."
            },
            {
              "key": "c",
              "text": "Transferência automática dos riscos para terceiros."
            },
            {
              "key": "d",
              "text": "Criação de uma falha intencional de processamento."
            },
            {
              "key": "e",
              "text": "Substituição de políticas por decisões informais."
            }
          ],
          "answer": "a",
          "gabarito": "O princípio da supervisão (ou revisão) mantém práticas que promovem a supervisão efetiva de procedimentos e decisões no ambiente de TI."
        },
        {
          "id": "sa-c4-q26",
          "number": 26,
          "kind": "mc",
          "heading": "Questão 26",
          "prompt": "Um hospital classifica seus documentos como públicos, internos e restritos. O objetivo principal dessa classificação é:",
          "options": [
            {
              "key": "a",
              "text": "Transformar automaticamente qualquer dado em informação anônima."
            },
            {
              "key": "b",
              "text": "Garantir que todos os documentos sejam disponibilizados publicamente."
            },
            {
              "key": "c",
              "text": "Aplicar medidas de proteção proporcionais à sensibilidade e ao uso das informações."
            },
            {
              "key": "d",
              "text": "Eliminar a necessidade de backups dos arquivos."
            },
            {
              "key": "e",
              "text": "Padronizar o preço dos computadores utilizados."
            }
          ],
          "answer": "c",
          "gabarito": "A classificação da informação (ISO 27001) define níveis como confidencial, restrita, uso interno e pública, para que cada informação seja rotulada e manuseada de forma segura conforme sua sensibilidade."
        },
        {
          "id": "sa-c4-q27",
          "number": 27,
          "kind": "mc",
          "heading": "Questão 27",
          "prompt": "Uma empresa adota autenticação multifator em acessos administrativos. O controle atua principalmente na proteção da:",
          "options": [
            {
              "key": "a",
              "text": "Velocidade de processamento de planilhas."
            },
            {
              "key": "b",
              "text": "Quantificação do valor esperado de perdas operacionais."
            },
            {
              "key": "c",
              "text": "Capacidade de armazenamento de arquivos temporários."
            },
            {
              "key": "d",
              "text": "Confidencialidade, ao dificultar acessos não autorizados."
            },
            {
              "key": "e",
              "text": "Qualidade da impressão de relatórios gerenciais."
            }
          ],
          "answer": "d",
          "gabarito": "É um controle de segurança e privacidade: dificulta acessos não autorizados e protege a confidencialidade, uma das propriedades da DICA."
        },
        {
          "id": "sa-c4-q28",
          "number": 28,
          "kind": "mc",
          "heading": "Questão 28",
          "prompt": "Um sistema registra quem alterou uma informação, quando a mudança ocorreu e qual valor foi modificado. Esse mecanismo apoia especialmente:",
          "options": [
            {
              "key": "a",
              "text": "Dispensa de procedimentos de autorização."
            },
            {
              "key": "b",
              "text": "Rastreabilidade e responsabilização das operações."
            },
            {
              "key": "c",
              "text": "Anonimato irrestrito de todas as transações internas."
            },
            {
              "key": "d",
              "text": "Impossibilidade de ocorrência de indisponibilidade."
            },
            {
              "key": "e",
              "text": "Redução obrigatória do custo de licenciamento."
            }
          ],
          "answer": "b",
          "gabarito": "O princípio de registro e comunicação exige autorização e registro de responsabilidades, o que garante rastreabilidade e auditoriabilidade."
        },
        {
          "id": "sa-c4-q29",
          "number": 29,
          "kind": "mc",
          "heading": "Questão 29",
          "prompt": "O formulário de cadastro rejeita automaticamente um CPF com quantidade incorreta de dígitos. Essa verificação é exemplo de:",
          "options": [
            {
              "key": "a",
              "text": "Controle de recuperação de desastres."
            },
            {
              "key": "b",
              "text": "Controle de entrada de dados."
            },
            {
              "key": "c",
              "text": "Controle de aprovação de investimentos."
            },
            {
              "key": "d",
              "text": "Controle de emissão de relatórios."
            },
            {
              "key": "e",
              "text": "Controle de segregação física do datacenter."
            }
          ],
          "answer": "b",
          "gabarito": "Controles de entrada asseguram que os dados de entrada sejam validados, editados e consistentes."
        },
        {
          "id": "sa-c4-q30",
          "number": 30,
          "kind": "mc",
          "heading": "Questão 30",
          "prompt": "Em um sistema de folha de pagamento, um teste compara o total calculado de salários ao total de registros processados e sinaliza divergências. Trata-se principalmente de:",
          "options": [
            {
              "key": "a",
              "text": "Controle de seleção de fornecedores."
            },
            {
              "key": "b",
              "text": "Controle de processamento."
            },
            {
              "key": "c",
              "text": "Controle de confidencialidade exclusivamente."
            },
            {
              "key": "d",
              "text": "Controle de recepção de documentos físicos."
            },
            {
              "key": "e",
              "text": "Controle apenas de entrada de dados."
            }
          ],
          "answer": "b",
          "gabarito": "Controles de processamento garantem que as transações foram processadas corretamente e por completo, inclusive verificando dados já processados (cross-footing)."
        },
        {
          "id": "sa-c4-q31",
          "number": 31,
          "kind": "mc",
          "heading": "Questão 31",
          "prompt": "Uma aplicação permite a emissão de relatórios financeiros apenas a perfis previamente autorizados. Esse mecanismo exemplifica:",
          "options": [
            {
              "key": "a",
              "text": "Controle de custo de aquisição de servidores."
            },
            {
              "key": "b",
              "text": "Controle de saída e distribuição de informações."
            },
            {
              "key": "c",
              "text": "Controle de captura de dados em formulário impresso."
            },
            {
              "key": "d",
              "text": "Controle de cálculo do valor esperado do risco."
            },
            {
              "key": "e",
              "text": "Controle de consistência do código postal na entrada."
            }
          ],
          "answer": "b",
          "gabarito": "Controles de saída e emissão de relatórios garantem que a informação chegue completa, no formato correto e de forma segura, preservando a confidencialidade."
        },
        {
          "id": "sa-c4-q32",
          "number": 32,
          "kind": "mc",
          "heading": "Questão 32",
          "prompt": "Uma organização realiza cópias diárias do banco de dados e testa periodicamente sua restauração. Esse procedimento é um controle de:",
          "options": [
            {
              "key": "a",
              "text": "Definição do orçamento anual."
            },
            {
              "key": "b",
              "text": "Validação de campos obrigatórios na entrada."
            },
            {
              "key": "c",
              "text": "Gravação e recuperação de dados."
            },
            {
              "key": "d",
              "text": "Apenas contratação de pessoal."
            },
            {
              "key": "e",
              "text": "Aprovação de relatórios de auditoria externa."
            }
          ],
          "answer": "c",
          "gabarito": "Controles de gravação e recuperação de dados incluem backup, espelhamento, RAID e a Política Institucional de Backup."
        },
        {
          "id": "sa-c4-q33",
          "number": 33,
          "kind": "mc",
          "heading": "Questão 33",
          "prompt": "Um procedimento exige que mudanças em produção sejam aprovadas por alguém diferente do desenvolvedor. A principal finalidade é:",
          "options": [
            {
              "key": "a",
              "text": "Reduzir alterações não autorizadas e conflitos de responsabilidade."
            },
            {
              "key": "b",
              "text": "Transferir ao fornecedor toda a responsabilidade legal pelos dados."
            },
            {
              "key": "c",
              "text": "Permitir que toda mudança seja aplicada sem registro."
            },
            {
              "key": "d",
              "text": "Evitar a necessidade de teste de software."
            },
            {
              "key": "e",
              "text": "Impedir a identificação de defeitos pelo auditor."
            }
          ],
          "answer": "a",
          "gabarito": "Pela segregação de funções, quem desenvolve não deve ser quem aprova ou opera. Isso reduz alterações não autorizadas e conflitos de responsabilidade."
        },
        {
          "id": "sa-c4-q34",
          "number": 34,
          "kind": "mc",
          "heading": "Questão 34",
          "prompt": "Uma empresa pretende instalar um controle que custa muito mais que o impacto provável do risco que procura reduzir. Qual princípio recomenda reavaliar essa decisão?",
          "options": [
            {
              "key": "a",
              "text": "Independência do fornecedor de energia."
            },
            {
              "key": "b",
              "text": "Custo-efetividade."
            },
            {
              "key": "c",
              "text": "Unicidade de senha de todos os usuários."
            },
            {
              "key": "d",
              "text": "Total ausência de documentação."
            },
            {
              "key": "e",
              "text": "Supressão de evidências."
            }
          ],
          "answer": "b",
          "gabarito": "Pelo princípio do custo efetivo, os investimentos em controles devem ser planejados para coincidir com o custo efetivo. Um controle mais caro que o risco deve ser reavaliado."
        },
        {
          "id": "sa-c4-q35",
          "number": 35,
          "kind": "mc",
          "heading": "Questão 35",
          "prompt": "Uma equipe identifica que existe uma política de backup assinada, mas não encontra registros de execuções recentes. Qual é a conclusão mais consistente?",
          "options": [
            {
              "key": "a",
              "text": "A existência formal do controle não comprova, por si só, sua execução eficaz."
            },
            {
              "key": "b",
              "text": "O risco está transferido automaticamente para o armazenamento externo."
            },
            {
              "key": "c",
              "text": "O auditor deve presumir conformidade e encerrar os testes."
            },
            {
              "key": "d",
              "text": "O documento assinado é prova suficiente de todas as restaurações."
            },
            {
              "key": "e",
              "text": "A ausência de registros demonstra que nenhum arquivo poderá ser recuperado."
            }
          ],
          "answer": "a",
          "gabarito": "O papel do auditor é confirmar se o controle existe e, se existe, se é efetivo. Uma política assinada sem registros de execução não prova que o backup funciona."
        },
        {
          "id": "sa-c4-q36",
          "number": 36,
          "kind": "mc",
          "heading": "Questão 36",
          "prompt": "Um servidor sem atualização de segurança está exposto a uma exploração conhecida. Na análise de riscos, a falha de atualização representa principalmente:",
          "options": [
            {
              "key": "a",
              "text": "Uma evidência de inexistência de ativos."
            },
            {
              "key": "b",
              "text": "Uma resposta de transferência de risco."
            },
            {
              "key": "c",
              "text": "Um impacto financeiro já concretizado."
            },
            {
              "key": "d",
              "text": "Uma vulnerabilidade que pode ser explorada por uma ameaça."
            },
            {
              "key": "e",
              "text": "Uma ação de recuperação de desastres concluída."
            }
          ],
          "answer": "d",
          "gabarito": "A falta de atualização é uma vulnerabilidade: a ameaça (a exploração conhecida) pode aproveitá-la e causar perdas."
        },
        {
          "id": "sa-c4-q37",
          "number": 37,
          "kind": "mc",
          "heading": "Questão 37",
          "prompt": "Em uma matriz qualitativa, um risco tem alta probabilidade e alto impacto. A decisão inicial mais adequada é:",
          "options": [
            {
              "key": "a",
              "text": "Eliminar qualquer monitoramento, pois o nível já é conhecido."
            },
            {
              "key": "b",
              "text": "Desconsiderá-lo por não haver perda ainda registrada."
            },
            {
              "key": "c",
              "text": "Aceitá-lo automaticamente sem análise de critérios."
            },
            {
              "key": "d",
              "text": "Classificá-lo como prioritário para avaliação de respostas e controles."
            },
            {
              "key": "e",
              "text": "Reduzir sua prioridade por possuir duas dimensões elevadas."
            }
          ],
          "answer": "d",
          "gabarito": "A análise qualitativa prioriza riscos combinando probabilidade e impacto. Alto × alto entra na lista de riscos que exigem resposta a curto prazo."
        },
        {
          "id": "sa-c4-q38",
          "number": 38,
          "kind": "mc",
          "heading": "Questão 38",
          "prompt": "Um risco tem probabilidade de 20% e prejuízo estimado em R$ 15.000 se ocorrer. Qual é seu valor monetário esperado, conforme o modelo simplificado usado em aula?",
          "options": [
            {
              "key": "a",
              "text": "R$ 30.000."
            },
            {
              "key": "b",
              "text": "R$ 12.000."
            },
            {
              "key": "c",
              "text": "R$ 750."
            },
            {
              "key": "d",
              "text": "R$ 7.500."
            },
            {
              "key": "e",
              "text": "R$ 3.000."
            }
          ],
          "answer": "e",
          "gabarito": "Valor monetário esperado = probabilidade × impacto: 0,20 × R$ 15.000 = R$ 3.000. É o mesmo cálculo do exemplo dos slides (10% × R$ 8 mil = R$ 800)."
        },
        {
          "id": "sa-c4-q39",
          "number": 39,
          "kind": "mc",
          "heading": "Questão 39",
          "prompt": "O que diferencia a análise quantitativa da qualitativa dos riscos?",
          "options": [
            {
              "key": "a",
              "text": "A quantitativa ignora probabilidade, enquanto a qualitativa ignora impacto."
            },
            {
              "key": "b",
              "text": "A quantitativa necessariamente elimina o risco identificado."
            },
            {
              "key": "c",
              "text": "A qualitativa só é possível depois da ocorrência de um desastre."
            },
            {
              "key": "d",
              "text": "A qualitativa substitui o registro dos riscos por opiniões sem critérios."
            },
            {
              "key": "e",
              "text": "A quantitativa estima efeitos em valores numéricos; a qualitativa prioriza por escalas de probabilidade e impacto."
            }
          ],
          "answer": "e",
          "gabarito": "A análise qualitativa prioriza riscos combinando probabilidade e impacto em escalas. A quantitativa analisa numericamente o efeito dos riscos, por exemplo em reais."
        },
        {
          "id": "sa-c4-q40",
          "number": 40,
          "kind": "mc",
          "heading": "Questão 40",
          "prompt": "Uma organização instala redundância de rede para diminuir a chance de interrupção de um serviço crítico. A resposta ao risco é:",
          "options": [
            {
              "key": "a",
              "text": "Mitigação ou redução do risco."
            },
            {
              "key": "b",
              "text": "Compartilhamento obrigatório do risco."
            },
            {
              "key": "c",
              "text": "Recusa de qualquer controle técnico."
            },
            {
              "key": "d",
              "text": "Eliminação da necessidade de monitoramento."
            },
            {
              "key": "e",
              "text": "Aceitação passiva sem medidas."
            }
          ],
          "answer": "a",
          "gabarito": "Controlar (mitigar) é modificar o risco implantando controles; a redundância reduz a chance de interrupção."
        },
        {
          "id": "sa-c4-q41",
          "number": 41,
          "kind": "mc",
          "heading": "Questão 41",
          "prompt": "Para uma atividade de baixo impacto, a direção decide conscientemente manter um risco dentro de critérios previamente estabelecidos. Essa decisão representa:",
          "options": [
            {
              "key": "a",
              "text": "Eliminação da fonte do risco."
            },
            {
              "key": "b",
              "text": "Transferência total da responsabilidade ao auditor."
            },
            {
              "key": "c",
              "text": "Aceitação do risco."
            },
            {
              "key": "d",
              "text": "Mitigação por alteração de arquitetura."
            },
            {
              "key": "e",
              "text": "Contratação compulsória de seguro."
            }
          ],
          "answer": "c",
          "gabarito": "Manter o risco de forma consciente, dentro de critérios definidos, é a resposta de aceitar o risco."
        },
        {
          "id": "sa-c4-q42",
          "number": 42,
          "kind": "mc",
          "heading": "Questão 42",
          "prompt": "Uma organização decide deixar de operar um serviço inseguro cuja continuidade não é necessária. Qual tratamento de risco melhor descreve a decisão?",
          "options": [
            {
              "key": "a",
              "text": "Apenas monitorar o risco com o serviço ativo."
            },
            {
              "key": "b",
              "text": "Aceitar o risco sem mudança operacional."
            },
            {
              "key": "c",
              "text": "Evitar o risco, eliminando a atividade que lhe dá origem."
            },
            {
              "key": "d",
              "text": "Reclassificar o impacto sem modificar a atividade."
            },
            {
              "key": "e",
              "text": "Transferir todo o risco ao usuário final."
            }
          ],
          "answer": "c",
          "gabarito": "Evitar (eliminar) o risco é remover a atividade que lhe dá origem; nos slides, o exemplo é mudar a empresa de local."
        },
        {
          "id": "sa-c4-q43",
          "number": 43,
          "kind": "mc",
          "heading": "Questão 43",
          "prompt": "Depois da implantação de novos controles, ainda existe exposição a incidentes. Essa exposição remanescente é denominada:",
          "options": [
            {
              "key": "a",
              "text": "Risco preliminar obrigatório."
            },
            {
              "key": "b",
              "text": "Nível de maturidade de serviço."
            },
            {
              "key": "c",
              "text": "Risco residual."
            },
            {
              "key": "d",
              "text": "Evidência definitiva de fraude."
            },
            {
              "key": "e",
              "text": "Controle administrativo de entrada."
            }
          ],
          "answer": "c",
          "gabarito": "O que sobra de exposição depois dos controles chama-se risco residual. O termo não aparece nos slides, mas é por isso que eles mandam monitorar e reavaliar os riscos periodicamente."
        }
      ],
      "flashcards": [
        {
          "id": "sa-c4-f1",
          "number": 1,
          "front": "Objetivos de um controle interno",
          "back": "Salvaguardar o ativo, manter a integridade e a confiabilidade dos registros, promover a eficiência operacional e encorajar o cumprimento das políticas da gerência."
        },
        {
          "id": "sa-c4-f2",
          "number": 2,
          "front": "Os dez princípios de controles internos em TI",
          "back": "Supervisão, registro e comunicação, segregação de funções, classificação da informação, tempestividade, controle independente, monitoramento, implantação, contingência e custo efetivo."
        },
        {
          "id": "sa-c4-f3",
          "number": 3,
          "front": "Segregação de funções",
          "back": "Responsabilidades incompatíveis divididas entre pessoas diferentes, para minimizar fraudes e suprimir erros. Exemplo: quem desenvolve o sistema não é quem o opera."
        },
        {
          "id": "sa-c4-f4",
          "number": 4,
          "front": "Classificação da informação (ISO 27001)",
          "back": "Níveis sugeridos: confidencial, restrita, uso interno e pública. Etapas: inventariar o ativo, classificar, rotular e manusear de forma segura."
        },
        {
          "id": "sa-c4-f5",
          "number": 5,
          "front": "Tempestividade × custo efetivo",
          "back": "Tempestividade: registrar, processar e comunicar resultados às pessoas certas em tempo hábil. Custo efetivo: investimentos em controles planejados para coincidir com o custo efetivo."
        },
        {
          "id": "sa-c4-f6",
          "number": 6,
          "front": "Os sete tipos de controles internos em TI",
          "back": "Administrativos e gerenciais; segurança e privacidade; preparação e captação de dados; entrada de dados; processamento; saída e emissão de relatórios; gravação e recuperação de dados."
        },
        {
          "id": "sa-c4-f7",
          "number": 7,
          "front": "O que é a DICA?",
          "back": "Disponibilidade, Integridade, Confidencialidade e Autenticidade: as propriedades básicas da informação associadas à segurança."
        },
        {
          "id": "sa-c4-f8",
          "number": 8,
          "front": "Controles de entrada × processamento × saída",
          "back": "Entrada: dados validados, editados e consistentes. Processamento: transações processadas corretamente e por completo (ex.: cross-footing). Saída: informação correta, completa e entregue de forma segura."
        },
        {
          "id": "sa-c4-f9",
          "number": 9,
          "front": "Controles de gravação e recuperação de dados",
          "back": "Controlam a liberação dos dados para processamento e o armazenamento, certificam a integridade nas bases e incluem RAID, espelhamento, backup e Política Institucional de Backup."
        },
        {
          "id": "sa-c4-f10",
          "number": 10,
          "front": "Como se calcula o risco?",
          "back": "Risco = Probabilidade × Impacto. A causa tem uma probabilidade (chance de acontecer); o efeito tem um impacto (prejuízo caso ocorra)."
        },
        {
          "id": "sa-c4-f11",
          "number": 11,
          "front": "Os seis passos da gestão de riscos",
          "back": "Planejar o gerenciamento, identificar os riscos, análise qualitativa, análise quantitativa, planejar as respostas e monitorar e controlar."
        },
        {
          "id": "sa-c4-f12",
          "number": 12,
          "front": "Análise qualitativa × quantitativa",
          "back": "Qualitativa: prioriza riscos combinando probabilidade e impacto (matriz). Quantitativa: analisa numericamente; ex.: VME = 10% × R$ 8 mil = R$ 800."
        },
        {
          "id": "sa-c4-f13",
          "number": 13,
          "front": "Quais são as respostas aos riscos?",
          "back": "Controlar (mitigar) com controles; aceitar; evitar (eliminar), por exemplo mudando a empresa de local; transferir, por exemplo contratando seguro."
        }
      ]
    },
    {
      "id": "sa-c5",
      "slug": "capitulo-5",
      "number": 5,
      "title": "Plano de Contingência e Recuperação de Desastres",
      "intro": "Partes I e II: plano de contingência, Plano de Continuidade de Negócios (PCN), BIA e testes.",
      "questions": [
        {
          "id": "sa-c5-q44",
          "number": 44,
          "kind": "mc",
          "heading": "Questão 44",
          "prompt": "Qual é a finalidade central de um Plano de Continuidade de Negócios (PCN)?",
          "options": [
            {
              "key": "a",
              "text": "Eliminar definitivamente a necessidade de cópias de segurança."
            },
            {
              "key": "b",
              "text": "Garantir que desastres nunca ocorrerão."
            },
            {
              "key": "c",
              "text": "Fazer com que somente a equipe de TI tome decisões corporativas."
            },
            {
              "key": "d",
              "text": "Preparar a organização para sustentar ou restabelecer atividades críticas diante de interrupções."
            },
            {
              "key": "e",
              "text": "Substituir o planejamento financeiro de todos os setores."
            }
          ],
          "answer": "d",
          "gabarito": "O objetivo do PCN é não permitir interrupções e proteger os processos críticos contra falhas ou desastres, assegurando a retomada dentro do tempo esperado."
        },
        {
          "id": "sa-c5-q45",
          "number": 45,
          "kind": "mc",
          "heading": "Questão 45",
          "prompt": "No planejamento de contingência, por que identificar primeiro os processos críticos?",
          "options": [
            {
              "key": "a",
              "text": "Para garantir recuperação simultânea de todos os sistemas, sem distinção."
            },
            {
              "key": "b",
              "text": "Para desligar permanentemente os serviços menos antigos."
            },
            {
              "key": "c",
              "text": "Para restringir o plano à compra de equipamentos."
            },
            {
              "key": "d",
              "text": "Para dispensar o apoio de gestores das áreas de negócio."
            },
            {
              "key": "e",
              "text": "Para estabelecer prioridades de recuperação considerando os efeitos da interrupção no negócio."
            }
          ],
          "answer": "e",
          "gabarito": "O plano começa pela classificação das aplicações críticas, e a BIA mede o impacto da interrupção de cada processo. É isso que define as prioridades de recuperação."
        },
        {
          "id": "sa-c5-q46",
          "number": 46,
          "kind": "mc",
          "heading": "Questão 46",
          "prompt": "Em um exercício de continuidade, representantes das áreas discutem decisões e responsabilidades diante de um cenário simulado, sem interromper os sistemas reais. Isso se aproxima de:",
          "options": [
            {
              "key": "a",
              "text": "Um exercício de mesa (tabletop)."
            },
            {
              "key": "b",
              "text": "Uma contratação definitiva de seguro."
            },
            {
              "key": "c",
              "text": "Uma restauração física completa do datacenter."
            },
            {
              "key": "d",
              "text": "Uma análise do código-fonte dos sistemas."
            },
            {
              "key": "e",
              "text": "Um ataque real conduzido sem autorização."
            }
          ],
          "answer": "a",
          "gabarito": "No teste tabletop define-se um cenário específico para praticar a interação da equipe e testar as tomadas de decisão, sem parar os sistemas reais."
        },
        {
          "id": "sa-c5-q47",
          "number": 47,
          "kind": "mc",
          "heading": "Questão 47",
          "prompt": "Por que um PCN documentado precisa ser testado e atualizado periodicamente?",
          "options": [
            {
              "key": "a",
              "text": "Porque testes só são necessários depois do fechamento da organização."
            },
            {
              "key": "b",
              "text": "Porque o plano substitui permanentemente os controles de segurança."
            },
            {
              "key": "c",
              "text": "Porque a assinatura do plano garante a recuperação sem exercícios."
            },
            {
              "key": "d",
              "text": "Para confirmar a viabilidade dos procedimentos e incorporar mudanças em pessoas, sistemas e dependências."
            },
            {
              "key": "e",
              "text": "Porque os processos críticos jamais mudam após sua aprovação."
            }
          ],
          "answer": "d",
          "gabarito": "Os testes medem a real eficácia do plano e permitem mantê-lo atualizado. Os slides recomendam periodicidade mínima de seis meses."
        }
      ],
      "flashcards": [
        {
          "id": "sa-c5-f1",
          "number": 1,
          "front": "O que é um plano de contingência?",
          "back": "Medidas operacionais documentadas para seguir quando os recursos de informática ficam indisponíveis, evitando que o tempo parado cause perdas ao negócio. Sinônimos: Plano de Continuidade de Negócios, plano de desastres."
        },
        {
          "id": "sa-c5-f2",
          "number": 2,
          "front": "Itens de um plano de contingência",
          "back": "Classificação das aplicações críticas, análise de riscos potenciais, contingências de recursos tecnológicos, contingência de sistemas e processos e matriz de responsabilidades."
        },
        {
          "id": "sa-c5-f3",
          "number": 3,
          "front": "O que a avaliação dos planos de contingência verifica?",
          "back": "Se cobrem todas as necessidades e aspectos (físicos, lógicos, redes, pessoas…), se a equipe está preparada, se são testados periodicamente e se os backups estão atualizados e recuperáveis."
        },
        {
          "id": "sa-c5-f4",
          "number": 4,
          "front": "Objetivo do PCN",
          "back": "Não permitir interrupções e proteger os processos críticos contra falhas ou desastres, assegurando a retomada no tempo esperado. Norma de referência: ISO 22301."
        },
        {
          "id": "sa-c5-f5",
          "number": 5,
          "front": "As cinco fases de implementação do PCN",
          "back": "Planejamento; levantamento de dados; análise de impacto nos negócios (BIA); estratégias de recuperação; desenvolvimento de planos."
        },
        {
          "id": "sa-c5-f6",
          "number": 6,
          "front": "O que é a BIA?",
          "back": "Business Impact Analysis: identifica os processos críticos e o impacto caso as ameaças se concretizem; gera os relatórios de criticidade e BIA. Impacto = (relevância do processo + relevância do ativo) / 2."
        },
        {
          "id": "sa-c5-f7",
          "number": 7,
          "front": "PAC, PCO e PRD",
          "back": "PAC: Programa de Administração de Crise (equipes antes, durante e depois do evento). PCO: Plano de Continuidade Operacional (manter processos vitais na falta de componentes). PRD: Plano de Recuperação de Desastres (site alternativo, backup, migração)."
        },
        {
          "id": "sa-c5-f8",
          "number": 8,
          "front": "Por que testar o PCN?",
          "back": "Os testes medem a real eficácia do plano e permitem mantê-lo atualizado. Periodicidade mínima: seis meses."
        },
        {
          "id": "sa-c5-f9",
          "number": 9,
          "front": "Structured walkthrough × tabletop",
          "back": "Walkthrough: o teste mais básico, uma reunião para familiarizar o pessoal crítico com o PCN. Tabletop: cenário específico para praticar a interação da equipe e testar decisões."
        },
        {
          "id": "sa-c5-f10",
          "number": 10,
          "front": "Functional testing × full scale",
          "back": "Functional: testa funções específicas, como gerenciamento de crises. Full scale: o mais detalhado, põe a maioria dos planos em ação simulando uma recuperação real."
        }
      ]
    },
    {
      "id": "sa-c6",
      "slug": "capitulo-6",
      "number": 6,
      "title": "Ferramentas e Técnicas de Auditoria de TI",
      "intro": "Softwares generalistas e especializados, técnicas de auditoria assistida por computador e Lei de Benford.",
      "questions": [
        {
          "id": "sa-c6-q48",
          "number": 48,
          "kind": "mc",
          "heading": "Questão 48",
          "prompt": "Uma ferramenta generalista de auditoria, como ACL ou IDEA nos exemplos dos slides, é especialmente útil para:",
          "options": [
            {
              "key": "a",
              "text": "Eliminar a necessidade de saber o objetivo dos testes."
            },
            {
              "key": "b",
              "text": "Extrair, filtrar, comparar e analisar registros de diferentes fontes."
            },
            {
              "key": "c",
              "text": "Garantir que toda anomalia estatística seja fraude comprovada."
            },
            {
              "key": "d",
              "text": "Substituir automaticamente qualquer julgamento profissional."
            },
            {
              "key": "e",
              "text": "Realizar obrigatoriamente alterações no sistema de produção."
            }
          ],
          "answer": "b",
          "gabarito": "Softwares generalistas como ACL e IDEA fazem extração e análise de dados: amostras, testes globais, sumarização e apontamento de duplicidades."
        },
        {
          "id": "sa-c6-q49",
          "number": 49,
          "kind": "mc",
          "heading": "Questão 49",
          "prompt": "O auditor precisa reexecutar uma regra de cobrança muito específica de uma única organização. Uma possível solução é:",
          "options": [
            {
              "key": "a",
              "text": "Emitir a conclusão sem comparar resultados processados."
            },
            {
              "key": "b",
              "text": "Afirmar que softwares generalistas executam qualquer lógica sem adaptação."
            },
            {
              "key": "c",
              "text": "Escolher aleatoriamente 10 registros e dispensar os demais testes."
            },
            {
              "key": "d",
              "text": "Utilizar um programa especializado desenvolvido para o teste requerido."
            },
            {
              "key": "e",
              "text": "Desativar as validações do sistema original."
            }
          ],
          "answer": "d",
          "gabarito": "O software generalista não roda funções específicas de uma organização. Para isso usa-se um software especializado, desenvolvido para a tarefa naquela circunstância."
        },
        {
          "id": "sa-c6-q50",
          "number": 50,
          "kind": "mc",
          "heading": "Questão 50",
          "prompt": "Ao aplicar a Lei de Benford a milhares de valores, o auditor observa forte desvio na frequência dos primeiros dígitos. Qual interpretação é mais adequada?",
          "options": [
            {
              "key": "a",
              "text": "O desvio é um sinal para aprofundar testes, não prova isolada de fraude."
            },
            {
              "key": "b",
              "text": "A técnica dispensa conhecer a natureza e a origem dos dados."
            },
            {
              "key": "c",
              "text": "O resultado autoriza a alteração de registros sem documentação."
            },
            {
              "key": "d",
              "text": "A lei exige que cada dígito inicial tenha exatamente a mesma frequência."
            },
            {
              "key": "e",
              "text": "Todos os valores desviantes devem ser tratados como crimes comprovados."
            }
          ],
          "answer": "a",
          "gabarito": "A Lei de Benford serve para verificar se existem inconsistências nos dados, inclusive fraudes. Um desvio é um indício que pede testes mais profundos, não uma prova isolada."
        }
      ],
      "flashcards": [
        {
          "id": "sa-c6-f1",
          "number": 1,
          "front": "O que são TAAC?",
          "back": "Técnicas de Auditoria Assistida por Computador: ajudam o auditor com tempo e orçamento limitados, usando softwares para validar grandes volumes de dados."
        },
        {
          "id": "sa-c6-f2",
          "number": 2,
          "front": "Aplicações de softwares na auditoria",
          "back": "Testes de controles gerais, testes de detalhes de transações, procedimentos analíticos e substantivos e amostragem."
        },
        {
          "id": "sa-c6-f3",
          "number": 3,
          "front": "Software generalista de auditoria",
          "back": "Conjunto de programas para várias funções: extração de amostras, testes globais, estatísticas, sumarização, duplicidades e sequências incorretas. Exemplos: ACL, IDEA, Audimation, Galileo, Pentana."
        },
        {
          "id": "sa-c6-f4",
          "number": 4,
          "front": "Vantagens × desvantagens do software generalista",
          "back": "Vantagens: processa vários arquivos e formatos e reduz a dependência do especialista de TI. Desvantagens: poucas aplicações on-line e não roda cálculos complexos específicos de uma organização."
        },
        {
          "id": "sa-c6-f5",
          "number": 5,
          "front": "Software especializado",
          "back": "Programa feito para uma tarefa numa circunstância definida, pelo auditor, pela empresa ou por terceiro. Atende verificações bem específicas, mas pode ser caro."
        },
        {
          "id": "sa-c6-f6",
          "number": 6,
          "front": "Dados de teste (test data / test deck)",
          "back": "Conjunto de entradas preparado para testar os controles da aplicação e comparar com resultados predeterminados. É difícil prever todas as combinações de transações."
        },
        {
          "id": "sa-c6-f7",
          "number": 7,
          "front": "Teste integrado (ITF)",
          "back": "Insere dados de teste no ambiente de produção e compara os resultados com os predeterminados. Vantagem: não exige ambiente exclusivo. Desvantagem: os dados precisam ser removidos e há risco de contaminação."
        },
        {
          "id": "sa-c6-f8",
          "number": 8,
          "front": "Simulação paralela",
          "back": "Programa especial que reprocessa transações já executadas para verificar se os resultados são idênticos. Processa grande volume, mas pode ser caro e ter escopo restrito."
        },
        {
          "id": "sa-c6-f9",
          "number": 9,
          "front": "Lei de Benford na auditoria",
          "back": "Teste estatístico do primeiro dígito: em dados naturais, o 1 aparece em cerca de 30% dos casos. Desvios apontam inconsistências a investigar, inclusive possíveis fraudes."
        },
        {
          "id": "sa-c6-f10",
          "number": 10,
          "front": "Benefícios das técnicas de auditoria",
          "back": "Produtividade, redução de custos, qualidade assegurada, valor agregado, benefícios corporativos e independência do auditor."
        }
      ]
    }
  ]
};

export default subject;
