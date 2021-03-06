# Account Manager System

## Execution Manual for development
```
 npm install
```
```
 npm run start
 ```

## The Challenge</br>

> Develop the REST API resources that perform banking transactions.

### Minimum Scope

- [x] Implement path that performs the creation of an account.
- [x] Implement path that performs deposit operation on an account.
- [x] Implement path that performs balance inquiry operation on a given account.
- [x] Implement path that performs withdrawal operation on an account.
- [x] Implement path that performs the blocking of an account.
- [x] Implement path that retrieves the account statement of transactions.

### What Will Be Differential & Evaluated

- Implement statement by period.
- Develop execution manual.
- Prepare documentation.
- Develop tests.
- Implementation of points of failure and resilience.
- Elaborate design of the project architecture.

---

## Entity-Relationship Diagram of SQL DataBase

</br>![ERD AMS_DB](img/AMS_DB.png)

---

## Endpoints

### [POST - "/account/create"] : Create an account and person/client.

- **Expect:** _{person.name, person.document, person.birthDate, account.dailyWithdrawlLimit, account.accountType}._
- **Return:** _Object {personId , accountId}._

### [POST - "/account/deposit"] : Create a deposit.

- **Expect:** _{ "id": account.id, "amountDeposit": transaction.value }._
- **Return:** _Message: '${transaction.value} was deposited successfully'._

### [GET - "/account/balance"] : Get balance.

- **Expect:** _{ "id": account.id }_
- **Return:** _Object { "balance": number}_

### [POST - "/account/withdraw"] : Withdraw amount.

- **Expect:** _{ "id": account.id, "amountWithdraw": transaction.value }._
- **Return:** _Message: '${transaction.value} have been withdrawn successfully'._

### [PUT - "/account/block"] : Block Account.

- **Expect:** _{ "id": account.id }._
- **Return:** _Message: 'Account ${account.id} has been blocked'._

### [GET - "/account/statment"] : Geting Account Statment.

- **Expect:** _{ "id": account.id }._
- **Return:** _Array of Object [{"id": 20, "value": 2000, "transactionDate": "2022-01-04T22:00:00.000Z"},...]_

### [GET - "/account/statment/period"] : Geting Account Statment filter by period.

- **Expect:** _{ "id": account.id, "from": "Date(YYYY-MM-DD)", "to": "Date(YYYY-MM-DD)" }._
- **Return:** _Array of Object [{"id": 20, "value": 2000, "transactionDate": "2022-01-04T22:00:00.000Z"},...]_
