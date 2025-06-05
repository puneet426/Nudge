"use client";
import { Collection } from '@prisma/client';
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader} from './dialog';
import { cn } from '@/lib/utils';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { createTaskSchema, createTaskSchemaType } from '@/schema/createTask';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Textarea } from './textarea';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';
import { Button } from './button';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { createTask } from '@/actions/task';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';



interface Props{
    open:boolean;
    collection:Collection;
    setOpen:(open:boolean)=>void;
}

function CreateTaskDialog({open,collection,setOpen}:Props) {
    const router = useRouter();
    const form = useForm<createTaskSchemaType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues:{
            collectionId:collection.id,
        },
    });

    

    const onOpenChangeWrapper = (value:boolean)=>{
        setOpen(value);
        form.reset();
    }

    const onSubmit = async(data:createTaskSchemaType)=>{
        try{
            await createTask(data);
            toast("Success", {
                description: "Collection created successfully",
                });
                onOpenChangeWrapper(false);
                 router.refresh();
                
        }catch(e){
                const message = e instanceof Error ? e.message : "Cannot create collection";
                toast("Error", {
                    description:message,
                    
        
                 })
        }
    }

  return (
   <>
   <Dialog open={open} onOpenChange={onOpenChangeWrapper} >
    <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
            <DialogTitle className='flex gap-2'>
                Add tasks to collections:{" "}
                <span
                className={cn("p-[1px] bg-clip-text text-transparent ",
                    CollectionColors[collection.color as CollectionColor]
                )}
                >{collection.name}</span>
            </DialogTitle>
            <DialogDescription>
                Add a task to your collection. You can add as many as you want to a collection.
            </DialogDescription>
        </DialogHeader>
        <div className='gap-4 py-4'>
            <Form {...form}>
                <form className='space-y-4 flex flex-col' 
                onSubmit={form.handleSubmit(onSubmit)} >

                    <FormField control={form.control}
                    name='content'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea rows={8} placeholder='Task content here'{...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
  )}
                    />
                    <FormField control={form.control}
                    name='expiresAt'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Expires at</FormLabel>
                            <FormDescription>When should this task expire?</FormDescription>
                            <FormControl>
                               <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn("justify-start text-left font-normal w-full",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4'/>
                                        {field.value && format(field.value,"PPP")}
                                        {!field.value && <span>No expiration</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar mode='single'
                                    selected={field.value} onSelect={field.onChange} initialFocus />
                                </PopoverContent>
                               </Popover>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
  )}
                    />
                </form>

            </Form>
        </div>
        <DialogFooter>
            <Button
            disabled={form.formState.isSubmitting}
            className={cn("w-full dark:text-white text-white",
                CollectionColors[collection.color as CollectionColor]
                )}
                onClick={form.handleSubmit(onSubmit)}
                >Confirm
            {form.formState.isSubmitting && (
                <ReloadIcon className='animate-spin h-4 w-4 ml-2'/>
            ) }
            </Button>
        </DialogFooter>
    </DialogContent>
   </Dialog>
   </>
  )
}

export default CreateTaskDialog