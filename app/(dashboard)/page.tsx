import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CollectionCard from "@/components/ui/CollectionCard";
import CreateCollectionBtn from "@/components/ui/CreateCollectionBtn";
import { Skeleton } from "@/components/ui/skeleton";
import {prisma } from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server"
import { Prisma } from "@prisma/client";
import { Suspense } from "react";

export default async function Home() {
return(
    <>
 <Suspense fallback={<WelcomMsgFallback/>}>
  <WelcomMsg/>
 
 
  </Suspense>
  <Suspense fallback={<div>Loading collection...</div>}>
    <CollectionList/>
  </Suspense>
   
  </>
)
    
 
  
}
async function WelcomMsg(){
      const user = await currentUser();
      // await wait(3000);

  if(!user){
    return <div>error</div>
  }
return(
 <div className="w-full flex mb-12">
  <h1 className="text-4xl font-bold">
 Welcome, <br/> {user.firstName} {user.lastName}
</h1>
 </div>
) } 


    function WelcomMsgFallback(){
      return(
        <div className="w-full flex mb-12">
  <h1 className="text-4xl font-bold">
<Skeleton className="w-[150px] h-[36px]"/>
<Skeleton className="w-[150px] h-[36px]"/>
</h1>
 </div>
      )
    }


async function CollectionList(){
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include:{
      tasks:true,
    },
    where:{
      userId:user?.id,
    },
  }satisfies Prisma.CollectionFindManyArgs);
  
  if(collections.length===0){
   return( 
    <div className="flex flex-col gap-5 ">
      <Alert>
    <SadFace/>
      <AlertTitle>There are no collections yet!</AlertTitle>
      <AlertDescription>Create a collection to get satrted</AlertDescription>
    </Alert>
    <CreateCollectionBtn/>
    </div>
   );
  }
  return(
    <div>
      
    <CreateCollectionBtn/>
    <div className="flex flex-col gap-4 mt-6">
    {collections.map((collection)=>(
      <CollectionCard key={collection.id} collection={collection} />
    ))}
    </div>
    </div>
  );
}