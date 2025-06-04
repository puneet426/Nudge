import { CollectionColors } from '@/lib/constants';
import {z} from 'zod';

export const createCollectionSchema = z.object({
    name:z.string().min(4,{
        message:"Collection name must be at least 4 characters"
    }),
    color: z.string().refine(color=>Object.keys(CollectionColors).includes(color))
})

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;