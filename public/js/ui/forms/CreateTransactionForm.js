/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    this.element.reset();

    Account.list(this.data, (err, resp) => {
      let accountList;

      switch (this.element.id) {
        case 'new-income-form':
          accountList = document.querySelector('#income-accounts-list'); 
          while (accountList.firstChild) {
            accountList.removeChild(accountList.firstChild);
          }
          
          if (resp && resp.success ) {
            resp.data.forEach(a =>  {
            let addItem = ` <option value="${a.id}">${a.name}</option>`
            accountList.insertAdjacentHTML('beforeend', addItem)
            });
           this.nameModal = 'newIncome';
          }
          break;
        case 'new-expense-form':
          accountList = document.querySelector('#expense-accounts-list');
          while (accountList.firstChild) {
            accountList.removeChild(accountList.firstChild);
          }

          if (resp && resp.success ) {
            resp.data.forEach(a =>  {
            let addItem = ` <option value="${a.id}">${a.name}</option>`
            accountList.insertAdjacentHTML('beforeend', addItem)
            });
            this.nameModal = 'newExpense';
          }
          break;
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if (resp && resp.success) {
        App.getModal(this.nameModal).close();  
        App.update();
      }
    })
  }
}