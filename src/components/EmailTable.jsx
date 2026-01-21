import React from "react";

const EmailTable = ({emails}) => {
  return (
    <div className="p-8">
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium"></th>
               <th scope="col" class="px-6 py-3 font-medium">Index</th>
              <th scope="col" class="px-6 py-3 font-medium">
                Email address
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Name
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Country
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Price
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
           {[1,2,3,4,5,6,7,8,9,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item, index)=>(
             <tr class="bg-neutral-primary-soft border-b  border-default" key={index}>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                
               <input type="checkbox" name="" id="" className="w-[20px] h-[20px] cursor-pointer"/>
              </th>
                  <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                
              {index + 1}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                <a href="#" class="font-medium text-fg-brand hover:underline">
                  Edit
                </a>
              </td>
            </tr>
           ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailTable;
