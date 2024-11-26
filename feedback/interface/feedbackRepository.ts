import { SupabaseClient } from "@supabase/supabase-js";

import { Repository } from "@/interface/repository";
import { Feedback } from "../domain/Feedback";

export class FeedbackRepository extends Repository<Feedback> {
  constructor(client: SupabaseClient) {
    super("feedback", client);
  }
}
