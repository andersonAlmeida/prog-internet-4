define({ "api": [
  {
    "type": "post",
    "url": "/agents",
    "title": "Criar um novo agente",
    "name": "create",
    "group": "Agentes",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Chave do agente do dialogflow</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    key : \"0354aS@#$42zc\"\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\" : \"5f7a1606aebd8d3a3cce261e\"\n    \"key\" : \"0354aS@#$42zc\"\n    \"status\" : 1\n}",
          "type": "Object"
        }
      ]
    },
    "filename": "src/controllers/agentsController.js",
    "groupTitle": "Agentes"
  },
  {
    "type": "delete",
    "url": "/agents/:id",
    "title": "Deleta o agente com o id passado se o mesmo não está em uso",
    "name": "delete",
    "group": "Agentes",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id do agente</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    _id : \"5f16addda5665465a42zc\"\n    status : 1\n    key : \"0354aS@#$42zc\"\n}",
          "type": "Object"
        }
      ]
    },
    "filename": "src/controllers/agentsController.js",
    "groupTitle": "Agentes"
  },
  {
    "type": "get",
    "url": "/agents",
    "title": "Listar todos os agentes",
    "name": "getAll",
    "group": "Agentes",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n  {\n    \"_id\": \"5f7293b19c4ef749a0fc0ffb\",\n    \"status\": 0,\n    \"key\": \"2345678\"\n  },\n  {\n    \"_id\": \"5f729feea417344b047d9258\",\n    \"status\": 0,\n    \"key\": \"1\"\n  },\n  {\n    \"_id\": \"5f729ff2a417344b047d9259\",\n    \"status\": 1,\n    \"key\": \"2\"\n  }\n]",
          "type": "JSON"
        }
      ]
    },
    "filename": "src/controllers/agentsController.js",
    "groupTitle": "Agentes"
  },
  {
    "type": "put",
    "url": "/agents/:id",
    "title": "Atualiza as informações de um agente",
    "name": "updateRequest",
    "group": "Agentes",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id do agente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    key : \"0354aS@#$42zc\"\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    _id : \"5f16addda5665465a42zc\"\n    status : 1\n    key : \"0354aS@#$42zc\"\n}",
          "type": "Object"
        }
      ]
    },
    "filename": "src/controllers/agentsController.js",
    "groupTitle": "Agentes"
  },
  {
    "type": "post",
    "url": "/intents",
    "title": "Criar intent",
    "name": "create",
    "group": "Intents",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "trainingPhrases",
            "description": "<p>Array de objetos com as partes das intens</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "responses",
            "description": "<p>Array de respostas possíveis para as intents</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome da intent</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "action",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "parameter",
            "description": "<p>Array de parâmetros das intents</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Id do usuário que cadastrou a intent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"trainingPhrases\": [\n    {\n      \"parts\": [\n        {\n          \"text\": \"oi\",\n          \"entityType\": \"\",\n          \"alias\": \"\",\n          \"userDefined\": false\n        },\n\t\t\t\t{\n          \"text\": \"olá\",\n          \"entityType\": \"\",\n          \"alias\": \"\",\n          \"userDefined\": false\n        }\n      ]\n\t\t}\n\t],\n\t\"responses\": [\"oi tudo bem\"],\n\t\"name\": \"Saudação\",\n\t\"action\": \"\",\n\t\"parameters\": [],\n\t\"user\": \"5f791850bb48e5346cd2725d\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"responses\": [\n    \"oi tudo bem\"\n  ],\n  \"trainingPhrases\": [\n    {\n      \"parts\": [\n        {\n          \"text\": \"oi\",\n          \"entityType\": \"\",\n          \"alias\": \"\",\n          \"userDefined\": false\n        },\n        {\n          \"text\": \"olá\",\n          \"entityType\": \"\",\n          \"alias\": \"\",\n          \"userDefined\": false\n        }\n      ]\n    }\n  ],\n  \"parameters\": [],\n  \"_id\": \"5f7a274c44cced33fc1b7f45\",\n  \"name\": \"Saudação\",\n  \"user\": \"5f791850bb48e5346cd2725d\"\n}",
          "type": "type"
        }
      ]
    },
    "filename": "src/controllers/intentsController.js",
    "groupTitle": "Intents"
  },
  {
    "type": "delete",
    "url": "/intents/:id",
    "title": "Deleta um intent",
    "name": "delete",
    "group": "Intents",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id da intent</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/intentsController.js",
    "groupTitle": "Intents"
  },
  {
    "type": "get",
    "url": "/intents/user/:id",
    "title": "Listar por usuário",
    "name": "getAllByUserId",
    "group": "Intents",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id do usuário</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/intentsController.js",
    "groupTitle": "Intents"
  },
  {
    "type": "get",
    "url": "/intents/:id",
    "title": "Detalhe da intent",
    "name": "getOne",
    "group": "Intents",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id da intent</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/intentsController.js",
    "groupTitle": "Intents"
  },
  {
    "type": "put",
    "url": "/intents/:id",
    "title": "Atualizar intent",
    "name": "update",
    "group": "Intents",
    "version": "1.0.0",
    "filename": "src/controllers/intentsController.js",
    "groupTitle": "Intents"
  },
  {
    "type": "post",
    "url": "/usuarios",
    "title": "Criar usuário",
    "name": "create",
    "group": "Usuários",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role",
            "description": "<p>Permissão do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"name\": \"user\",\n   \"email\": \"user@gmail.com\",\n   \"password\": \"123456\",\n   \"role\": \"admin\"\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Permissão do usuário. Valores: admin ou user</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status do cadastro do usuário. Valores: 1 - ativo, 0 - inativo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id do usuário</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "agent",
            "description": "<p>Código do agente do dialogflow para o usuário</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/usersController.js",
    "groupTitle": "Usuários"
  },
  {
    "type": "post",
    "url": "/usuarios/login",
    "title": "Efetua login",
    "name": "doLogin",
    "group": "Usuários",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    email : value\n    password : value\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>dados do usuário</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    user : {...}\n    token : \"...\"\n}",
          "type": "type"
        }
      ]
    },
    "filename": "src/controllers/usersController.js",
    "groupTitle": "Usuários"
  },
  {
    "type": "get",
    "url": "/usuarios",
    "title": "Lista usuários",
    "name": "getAll",
    "group": "Usuários",
    "version": "1.0.0",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Permissão do usuário. Valores: admin ou user</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status do cadastro do usuário. Valores: 1 - ativo, 0 - inativo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id do usuário</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "agent",
            "description": "<p>Código do agente do dialogflow para o usuário</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/usersController.js",
    "groupTitle": "Usuários"
  },
  {
    "type": "get",
    "url": "/usuarios/:id",
    "title": "Lista detalhes do usuário",
    "name": "getOne",
    "group": "Usuários",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id do usuário</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Permissão do usuário. Valores: admin ou user</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status do cadastro do usuário. Valores: 1 - ativo, 0 - inativo</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id do usuário</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "agent",
            "description": "<p>Objeto com os dados do agente do dialogflow para o usuário</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/usersController.js",
    "groupTitle": "Usuários"
  },
  {
    "type": "put",
    "url": "/usuarios/:id",
    "title": "Atualizar usuário",
    "name": "update",
    "group": "Usuários",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "type",
            "optional": false,
            "field": "name",
            "description": "<p>description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    property : value\n}",
          "type": "type"
        }
      ]
    },
    "filename": "src/controllers/usersController.js",
    "groupTitle": "Usuários"
  }
] });
