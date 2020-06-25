import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return {income: this.getTotalIncome(), outcome: this.getTotalOutcome(), total: (this.getTotalIncome() - this.getTotalOutcome())};
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  public getTotalIncome(): number {
    return this.all().reduce(
      function (total, item){
        if(item.type === 'income'){
           return total + item.value;
        }

        return total;
      }, 0
    );
  }

  public getTotalOutcome(): number {
    return this.all().reduce(
      function (total, item){
        if(item.type === 'outcome'){
           return total + item.value;
        }

        return total;
      }, 0
    );
  }
}

export default TransactionsRepository;
