import { Repository } from "@/interface/repository";
import { Feedback } from "../domain/Feedback";
import { supabase } from "@/interface/supabase";

export const feedbackRepository = new Repository<Feedback>("feedback", supabase);
