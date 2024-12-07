"use client";

import { FC, useActionState } from "react";
import { z } from 'zod';

const initialState = {name_input: '', age_input: 20}
type InitialStateType = typeof initialState;
interface NameAgeState extends InitialStateType {
  errorMessage?: {name_input?: string[]|undefined, age_input?: string[]|undefined}
};
const schema = z.object({
  name_input: z.string().refine(name => !name.includes('@'), {message: 'name is not email'}),
  age_input: z.number().min(3, {message: 'min is 3'}).max(120, {message: 'max is 120.'}).step(1, {message: 'step must be 1.'})
});

type NameAge = {
  name_input: string;
  age_input: number;
};

async function someAction(previousState:NameAgeState , formData:FormData):Promise<NameAgeState> {
  "use server";
  const payload:NameAge = {
    name_input: formData.get('name_input') as string,
    age_input: Number(formData.get('age_input')) as number
  };
  await new Promise(resolve => setTimeout(resolve, 2000));
  const { success, data, error } = schema.safeParse(payload);
  if (success){
    console.log("success")
    return {...data, errorMessage: undefined}
  } else {
    const errorField = error.flatten().fieldErrors
    return {...previousState, errorMessage: errorField}
  };
};

export const FormSample: FC = () => {
  const [state, action, isPending] = useActionState<NameAgeState, FormData>(someAction, initialState);

  return (
    <section>
      <h2><code>Form Action</code> sample.</h2>
      <form id="form-action-sample" name="form_action_sample" action={action}>
        <div>
          <label htmlFor="name-input">名前</label>
          <input type="text" id="name-input" name="name_input" defaultValue={initialState.name_input} disabled={isPending} />
          {!isPending && state.errorMessage?.name_input && state.errorMessage.name_input.map((message, i) => (
            <p key={i}>{message}</p>
          ))}
        </div>
        <div>
          <label htmlFor="age-input">年齢</label>
          <input  type="number" id="age-input" name="age_input" min={3} max={120} defaultValue={initialState.age_input} step={1} disabled={isPending} />
          {!isPending && state.errorMessage?.age_input && state.errorMessage.age_input.map((message, i) => (
            <p key={i}>{message}</p>
          ))}
        </div>
        <button type="submit" disabled={isPending}>送信</button>
      </form>
    </section>
  )
}

export default FormSample