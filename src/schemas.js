/**
 * @swagger
 * definitions:
 *   Usuario:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID do usuário
 *       name:
 *         type: string
 *         description: Nome do usuário
 *       gender:
 *         type: string
 *         description: Gênero do usuário
 *       cpf:
 *         type: string
 *         description: CPF do usuário
 *       address:
 *         type: string
 *         description: Endereço do usuário
 *       email:
 *         type: string
 *         description: Email do usuário
 *       password:
 *         type: string
 *         description: Senha do usuário
 *       birth:
 *         type: string
 *         format: date
 *         description: Data de nascimento do usuário
 *       createdAt:
 *         type: string
 *         format: date-time
 *         description: Data de criação do usuário
 *       updatedAt:
 *         type: string
 *         format: date-time
 *         description: Data da última atualização do usuário
 *   Destino:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID do destino
 *       destination:
 *         type: string
 *         description: Nome do destino
 *       description:
 *         type: string
 *         description: Descrição do destino
 *       location:
 *         type: string
 *         description: Localização do destino (CEP ou endereço)
 *       latitude:
 *         type: string
 *         description: Latitude do destino
 *       longitude:
 *         type: string
 *         description: Longitude do destino
 *       user_id:
 *         type: integer
 *         description: ID do usuário
 *       createdAt:
 *         type: string
 *         format: date-time
 *         description: Data de criação do destino
 *       updatedAt:
 *         type: string
 *         format: date-time
 *         description: Data da última atualização do destino
 */

const schemas = {
  Usuario: { /* Definição do schema Usuario */ },
  Destino: { /* Definição do schema Destino */ },
};

module.exports = { schemas };