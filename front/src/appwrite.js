import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Correct endpoint
  .setProject('679d0bc00016aaf6c16f'); // Replace with your real project ID



const account = new Account(client);

export { account, client };
