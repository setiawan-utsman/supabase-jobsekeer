import React from 'react'

export default function ManageTableWidget({data}:{data?:any}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 border-collapse shadow-md rounded-lg overflow-hidden text-sm bg-white">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="border border-gray-200 py-3 px-3 font-semibold text-gray-700 w-10">
              <input type="checkbox" className="w-4 h-4" />
            </th>
            <th className="border border-gray-200 py-3 px-3 font-semibold text-gray-700">
              NAMA LENGKAP
            </th>
            <th className="border border-gray-200 py-3 px-3 font-semibold text-gray-700">
              EMAIL ADDRESS
            </th>
            <th className="border border-gray-200 py-3 px-3 font-semibold text-gray-700">
              PHONE NUMBERS
            </th>
            <th className="border border-gray-200 py-3 px-3 font-semibold text-gray-700">
              DATE of BIRTH
            </th>
            <th className="border border-gray-200 py-3 px-3 font-semibold text-gray-700">
              DOMICILE
            </th>
            <th className="border border-gray-200 py-3 px-3 font-semibold text-gray-700">
              GENDER
            </th>
            <th className="border border-gray-200 py-3 px-3 font-semibold text-gray-700">
              LINK LINKEDIN
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item: any, i: number) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="border border-gray-200 py-3 px-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="capitalize border border-gray-200 py-3 px-3 text-gray-800">
                  {item.full_name}
                </td>
                <td className="capitalize border border-gray-200 py-3 px-3 text-gray-600 truncate max-w-[180px]">
                  {item.email}
                </td>
                <td className="capitalize border border-gray-200 py-3 px-3 text-gray-600">
                  {item.phone_number}
                </td>
                <td className="capitalize border border-gray-200 py-3 px-3 text-gray-600">
                  {item.date_of_birth}
                </td>
                <td className="capitalize border border-gray-200 py-3 px-3 text-gray-600">
                  {item.domicile}
                </td>
                <td className="capitalize border border-gray-200 py-3 px-3 text-gray-600">
                  {item.gender}
                </td>
                <td className="border border-gray-200 py-3 px-3 text-blue-600 underline truncate max-w-[180px] cursor-pointer" onClick={() => {
                 if (item?.linkedin_link) {
                   try {
                     window.open(
                       item.linkedin_link,
                       "_blank",
                       "noopener,noreferrer"
                     );
                   } catch (error) {
                     console.error("Failed to open LinkedIn link:", error);
                   }
                 }
                }}>
                  {item.linkedin_link}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
