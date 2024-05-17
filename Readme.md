# Viagem365: Sua plataforma para viagens sustentáveis e memoráveis

## O que é o Viagem365?
Viagem365 é uma plataforma online que visa promover viagens sustentáveis e experiências positivas para os usuários. A plataforma oferece acesso a informações sobre destinos turísticos, praias, atrações naturais e atividades recreativas, ajudando os viajantes a planejar suas viagens de forma consciente e responsável.

## Problema que Resolve:
- **Descoberta de Destinos:** Facilita a descoberta de novos destinos e atividades, com base em informações detalhadas sobre cada local.
- **Planejamento Sustentável:** Incentiva o turismo responsável, fornecendo dicas e informações sobre práticas sustentáveis para os viajantes.
- **Compartilhamento de Experiências:** Permite que os usuários compartilhem suas experiências de viagens com outros usuários.

## Tecnologias Utilizadas:
- **Backend:** Node.js, Express, PostgreSQL
- **Banco de Dados:** PostgreSQL
- **Validação de Dados:** Yup
- **Autenticação:** JSON Web Tokens (JWT)
- **Geocodificação:** API do OpenStreetMap
- **Documentação:** Swagger


## Como Executar:
1. Clone o repositório: `git clone https://github.com/JuliaYuki/Viagem365.git`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` com as seguintes variáveis de ambiente:
    ```
    PORT_API=3000
    SECRET_JWT=sua_chave_secreta
    DIALECT=postgres
    HOST=localhost
    USERNAMEDB=seu_usuario_do_banco
    PASSWORDDB=sua_senha_do_banco
    DATABASE=nome_do_banco
    PORT=5432
    ```
4. Inicie o servidor: `npm run start:dev`

## Melhorias Futuras:
- **Integração com APIs de Viagem:** Integração com APIs de viagens para obter informações sobre voos, hotéis e outras opções de viagem.
- **Funcionalidades de Reserva:** Implementação de um sistema de reserva de hospedagem, atividades e outros serviços relacionados à viagem.
- **Mapeamento Interativo:** Criar um mapa interativo com informações sobre os destinos, incluindo marcadores, rotas e zoom.
- **Sistema de Avaliações:** Permitir que os usuários avaliem destinos e compartilhem suas opiniões com outros usuários.
- **Comunidade de Usuários:** Criar um fórum ou espaço para usuários se conectarem e compartilharem suas experiências de viagens.

## Contribuições:
Contribuições são bem-vindas! Se você tiver alguma ideia ou melhoria para o Viagem365, por favor, abra um Issue ou um Pull Request no repositório do GitHub.