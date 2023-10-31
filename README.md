## Sobre
Este projeto de backend demonstra a aplicação de um quadro Kanban. Foi utilizado o framework NestJS e o banco de dados PostgresSQL, além de Docker para conteinerizar o app.

## Instalação e inicialização
Antes de iniciar, certifique-se de o Docker está instalado e aberto. Se estiver pronto, use os comandos abaixo para instalar as dependências e iniciar o app.

```
npm install
docker-compose up --build
```

## Entidades e relações
O app tem apenas duas entidades: Tasks, referente às tarefas no quadro, e TaskStatus, referente às colunas do quadro e o status de cada tarefa. Os TaskStatus possuem uma relação OneToMany com as Tasks, portanto antes de adicionar Tasks, é necessário que exista pelo menos uma TaskStatus. Da mesma forma que para adicionar uma tarefa em um quadro Kanban, é necessário que exista uma coluna para recebê-la. 

## Endpoints 
O app irá rodar por padrão em http://localhost:3000

### TaskStatus
A entidade TaskStatus possui duas colunas, "title" e "color". Title se refere ao nome do status, e color é uma cor em HEX para ser selecionada e utilizada em um frontend, para diferenciar melhor cada coluna. 

#### Create (POST) /task-status
```
// body
{
	"title": "Em progresso",
	"color": "#ab9e79"
}

// response
{
	"title": "Em progresso",
	"color": "#ab9e79",
	"id": 5,
	"createdAt": "2023-10-30T22:38:38.369Z",
	"updatedAt": "2023-10-30T22:38:38.369Z"
}
```
#### List all (GET) /task-status
```
// response
[
	{
		"id": 1,
		"createdAt": "2023-10-30T03:54:17.340Z",
		"updatedAt": "2023-10-30T03:54:17.340Z",
		"title": "Em atraso",
		"color": "#94322b"
	},
	{
		"id": 3,
		"createdAt": "2023-10-30T19:38:43.047Z",
		"updatedAt": "2023-10-30T19:38:43.047Z",
		"title": "Por fazer",
		"color": "#ab9e79"
	},
	{
		"id": 4,
		"createdAt": "2023-10-30T19:39:43.649Z",
		"updatedAt": "2023-10-30T19:39:43.649Z",
		"title": "Em progresso",
		"color": "#197ee3"
	}
]
```
Além destes, há também endpoints para PATCH e DELETE através de /task-status/${id}
### Tasks
Após a criação de pelo menos um TaskStatus, é possível criar as Tasks. A entidade possui duas colunas obrigatórias e duas opcionais. "title" e "status" são obrigatórias, se referindo ao nome da task e o id do TaskStatus escolhido, respectivamente. Opcionalmente, é possível também adicionar uma descrição "description" e uma data de prazo final "endDate".

#### Create (POST) /tasks
```
// body
{
	"title": "First task",
	"description": "I really gotta finish this today",
	"status": 1,
	"endDate": "2023-10-31T00:44:47.929Z"
}

// response
{
	"title": "First task",
	"description": "I really gotta finish this today",
	"endDate": "2023-10-31T00:44:47.929Z",
	"status": {
		"id": 1,
		"createdAt": "2023-10-30T03:54:17.340Z",
		"updatedAt": "2023-10-30T03:54:17.340Z",
		"title": "Em atraso",
		"color": "#94322b"
	},
	"id": 5,
	"createdAt": "2023-10-31T00:44:48.278Z",
	"updatedAt": "2023-10-31T00:44:48.278Z"
}
```
#### List all (GET) /tasks
```
// response
[
	{
		"id": 1,
		"createdAt": "2023-10-30T03:55:24.580Z",
		"updatedAt": "2023-10-30T19:40:35.009Z",
		"title": "First task",
		"description": "I really gotta finish this today",
		"endDate": null,
		"status": {
			"id": 3,
			"createdAt": "2023-10-30T19:38:43.047Z",
			"updatedAt": "2023-10-30T19:38:43.047Z",
			"title": "Por fazer",
			"color": "#ab9e79"
		}
	},
	{
		"id": 3,
		"createdAt": "2023-10-30T19:47:51.884Z",
		"updatedAt": "2023-10-30T19:47:51.884Z",
		"title": "Second task",
		"description": "I really gotta finish this today too",
		"endDate": "2023-10-30",
		"status": {
			"id": 3,
			"createdAt": "2023-10-30T19:38:43.047Z",
			"updatedAt": "2023-10-30T19:38:43.047Z",
			"title": "Por fazer",
			"color": "#ab9e79"
		}
	},
]
```
Além destes, há também endpoints para PATCH e DELETE através de /tasks/${id}
## Testes unitários
Para rodar os testes, basta usar o comando abaixo.

```bash
npm run test
```
