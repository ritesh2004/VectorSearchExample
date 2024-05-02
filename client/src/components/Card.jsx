import React from "react";

export const Card = ({src,title,plot,directors}) => {
  return (
    <div className="card card-side bg-[#0c0a09] shadow-xl w-full md:w-[423px]">
      <figure className="h-auto w-[300px]">
        <img
        className="object-fill h-full w-full"
          src={src}
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[#fbbf24]">{title}</h2>
        <p className="text-sm text-[#a3a3a3]">{plot}</p>
        <strong>Directed By</strong>
        <div className="flex flex-wrap gap-1">
        {directors?.map((d)=>{
          return <p className="text-sm p-0 m-0">{d}</p>
        })}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-warning btn-outline rounded-lg">Watch</button>
        </div>
      </div>
    </div>
  );
};
