define({ "api": [
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
  }
] });
