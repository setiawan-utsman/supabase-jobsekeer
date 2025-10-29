import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export default function JobListWidget({
  data,
  callbackNavigate,
  callbackData
}: {
  data?: any;
  callbackNavigate: (path: string) => void;
  callbackData?: (data: any) => void;
}) {
  return (
    <div className="space-y-4 w-full">
      {data?.map((item: any, index: number) => (
        <Card className="border-gray-400/40 py-2 px-3 gap-2 group" key={index}>
          <div className="flex items-center gap-2">
            <Card
              className={`px-2 py-1 shadow-none capitalize ${
                item?.status === "active"
                  ? "bg-primary/10 border-primary/10 text-primary"
                  : "bg-red-500/10 border-red-500/50 text-red-500"
              }`}
            >
              {item?.status}
            </Card>
            <Card className=" border-gray-500/50 px-2 py-1 shadow-none">
              {item?.list_card?.started_on_text}
            </Card>
          </div>
          <div className="font-semibold capitalize">{item.title}</div>
          <div className="flex justify-between items-center w-full">
            <div className="text-gray-600/50">
              {item?.salary_range?.display_text}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 group-hover:visible invisible transition">
                <Button
                  className="cursor-pointer border-gray-200 hover:bg-gray-300/50 hover:text-gray-700 text-gray-600"
                  variant={"outline"} onClick={() => {if(callbackData) callbackData(item)}}
                >
                  Edit
                </Button>
                <Button
                  className="cursor-pointer border-red-200 bg-red-300/50 text-red-400 hover:bg-red-400 hover:text-white"
                  variant={"outline"} onClick={() => {
                    if(callbackData) callbackData({id: item?.id, delete: true})
                  }}
                >
                  Delete
                </Button>
              </div>

              <div className="flex items-center">
                <Button
                  className="text-white rounded-2xl cursor-pointer"
                  size="sm"
                  variant="default"
                  onClick={() =>
                    callbackNavigate(`/jobs/manage?id=${item?.id}`)
                  }
                >
                  Manage Job
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// bg-primary/10 border-primary/10 px-2 py-1 text-primary shadow-none
