'use client';
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './sheet';
import { useForm } from 'react-hook-form';
import { createCollectionSchema, createCollectionSchemaType } from '@/schema/createCollection';
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Separator } from './separator';
import { Button } from './button';
import { createCollection } from '@/actions/collection';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';



interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=> void;
}



function CreateCollectionSheet({open, onOpenChange}:Props) {
    const form = useForm<createCollectionSchemaType>({
        defaultValues:{},
        resolver: zodResolver(createCollectionSchema),
    })
   

    const onSubmit = async(data: createCollectionSchemaType) => {
       try{
            await createCollection(data);
            // close the sheet
            openChangeWrapper(false);
           
             toast("Success", {
              description: "Collection created successfully",
               })
       }catch (e) {
  const message = e instanceof Error ? e.message : "Something went wrong.";
  toast("Error", {
    description: message,
  });
     console.log("Error while creating collection",e);
       }
    };

    const openChangeWrapper = (open:boolean)=>{
        form.reset();
        onOpenChange(open);
    }

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper} >
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Add new collection</SheetTitle>
                <SheetDescription>
                    Collections are a way to group your tasks
                </SheetDescription>
            </SheetHeader>
           <div className='w-[95%] mx-auto'>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col' >
                <FormField
                control = {form.control}
                name="name"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder='Personal'{...field}/>
                        </FormControl>
                        <FormDescription>Collection name</FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                />

                <FormField
                control={form.control} 
                name="color"
                render={({field})=>(
                    <FormItem className='mt-4'>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                         <Select onValueChange={(color)=>field.onChange(color)}>
                           <SelectTrigger className={cn("w-full h-8 text-white",CollectionColors[field.value as CollectionColor])} >
                            <SelectValue placeholder="color" className='w-full h-8'/>
                            </SelectTrigger> 
                            <SelectContent className='w-full'>
                                {Object.keys(CollectionColors).map(color=>(
                                    <SelectItem key={color} value={color} className={cn(`w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8 `, CollectionColors[color as CollectionColor])} >{color}  </SelectItem>
                                ))}
                            </SelectContent>
                         </Select>
                        </FormControl>
                        <FormDescription>Select the color for your collection</FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
                
                />

                </form>
            </Form>
            <div className='flex flex-col gap-3 mt-4'>
                <Separator/>
            <Button disabled={form.formState.isSubmitting} variant={"outline"} className={cn( `text-white`, CollectionColors[form.watch("color") as CollectionColor ])} onClick={form.handleSubmit(onSubmit)}>Confirm {form.formState.isSubmitting && (<ReloadIcon className='ml-2 h-4 w-4 animate-spin'/>) } </Button>
            </div>
           </div>
        </SheetContent>
    </Sheet>
  )
}

export default CreateCollectionSheet