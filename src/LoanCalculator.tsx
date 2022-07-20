/** @format */
import { useState } from "react";
import LoanJS from "loanjs";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export default function LoanCalculator() {
  const [values, setValues] = useState({
    "loan-amount": 0,
    "loan-term": 0,
    "interest-rate": 0,
  });

  const [installments, setInstallements] = useState<any[]>([]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    calculate(
      values["loan-amount"],
      values["loan-term"],
      values["interest-rate"]
    );
  };

  const calculate = (amount: number, years: number, rate: number) => {
    var loan = new LoanJS.Loan(amount, years * 12, rate);
    setInstallements(loan.installments);
  };

  const amountFormat = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  return (
    <div>
      <div className='px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>
          <img
            src='https://st.depositphotos.com/1002049/4836/i/950/depositphotos_48368119-stock-photo-calculator-icon.jpg'
            alt=''
            className='w-20 h-20'
          />
          <form onSubmit={handleSubmit}>
            <div className='shadow-md sm:rounded-md sm:overflow-hidden'>
              <div className='px-4 py-6 space-y-6 bg-white sm:p-6'>
                <div>
                  <h3 className='text-lg font-medium leading-6 text-gray-900'>
                    Loan Calculator
                  </h3>
                </div>

                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                    <label
                      htmlFor='loan-amount'
                      className='block text-sm font-medium text-gray-700'>
                      Loan Amount
                    </label>
                    <div className='flex rounded-md'>
                      <span className='inline-flex items-center px-3 py-2 mt-1 bg-gray-100 rounded-l-md'>
                        $
                      </span>

                      <input
                        type='text'
                        name='loan-amount'
                        id='loan-amount'
                        value={values["loan-amount"]}
                        onChange={handleInputChange}
                        className='block w-full px-3 py-2 mt-1 border border-gray-300 shadow-sm rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                    <label
                      htmlFor='interest-rate'
                      className='block text-sm font-medium text-gray-700'>
                      Interest Rate
                    </label>
                    <input
                      type='text'
                      name='interest-rate'
                      id='interest'
                      value={values["interest-rate"]}
                      onChange={handleInputChange}
                      className='block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                    <label
                      htmlFor='loan-terms'
                      className='block text-sm font-medium text-gray-700'>
                      Loan Terms
                    </label>

                    <div className='flex rounded-md '>
                      <input
                        type='text'
                        name='loan-term'
                        id='loan-term'
                        value={values["loan-term"]}
                        onChange={handleInputChange}
                        className='block w-full px-3 py-2 mt-1 border border-gray-300 shadow-sm rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                      />

                      <span className='inline-flex items-center px-3 py-2 mt-1 bg-gray-100 rounded-r-md'>
                        Years
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
                <button
                  type='submit'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 '>
                  Calculate
                </button>
              </div>
            </div>
          </form>

          {/* TABLE -------------------------------------------------------------------------------- */}

          {!!installments?.length && (
            <div className='py-4'>
              <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                  <h1 className='text-xl font-semibold text-gray-900'>
                    Amortization Schedule
                  </h1>
                  <p className='mt-2 text-sm text-gray-700'>
                    Here is the estimated projected outcome.
                  </p>
                </div>
              </div>

              <div className='flex flex-col mt-8'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle max-h-96 min-h-96 md:px-6 lg:px-8'>
                    <div className='shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                      <table className='min-w-full divide-y divide-gray-300 '>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th
                              scope='col'
                              className='whitespace-nowrap py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6'>
                              Month
                            </th>
                            <th
                              scope='col'
                              className='whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900'>
                              Payment Amount
                            </th>
                            <th
                              scope='col'
                              className='whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900'>
                              Interest Paid
                            </th>
                            <th
                              scope='col'
                              className='whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900'>
                              Principal Paid
                            </th>
                            <th
                              scope='col'
                              className='whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900'>
                              Remaining
                            </th>
                          </tr>
                        </thead>

                        <tbody className='relative overflow-y-scroll text-center bg-white divide-y divide-gray-20'>
                          {installments.map((i: any, ind: number) => (
                            <tr key={ind} className='even:bg-gray-200'>
                              <td>{ind}</td>
                              <td>{amountFormat(i.installment)}</td>
                              <td>{amountFormat(i.interest)}</td>
                              <td>{amountFormat(i.capital)}</td>
                              <td>{amountFormat(i.remain)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
