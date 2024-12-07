"use client";

import { FC, Suspense, use } from "react";
import { ErrorBoundary } from "../ErrorBoundary"

function SetTimeoutPromise(milliseconds:number) {
  return new Promise((resolve)=>{setTimeout(resolve, milliseconds)});
};

async function fetchWillSucceed() {
  await SetTimeoutPromise(1000);
  return {name: "santa"};
};
async function fetchWillError() {
  await SetTimeoutPromise(700);
  throw new Error
};

const SuccessFC:FC<{successPromise:Promise<{name: string}>}> = ({successPromise}) => {
  const data = use(successPromise);
  return (
    <div>{JSON.stringify(data)}</div>
  )
};
const ErrorFC:FC<{errorPromise:Promise<any>}> = ({errorPromise}) => {
  const data = use(errorPromise);
  return (
    <div>{JSON.stringify(data)}</div>
  )
};
const FallbackFC:FC = () => {
  return(
    <div>Loading...</div>
  )
};

export const PromiseErrorClient = () => {
  const successPromise = fetchWillSucceed();
  const errorPromise = fetchWillError();
  return (
    <section>
      <h2><code>use</code> Promise Error.</h2>
      <Suspense fallback={<FallbackFC />}>
        <SuccessFC {...{successPromise}}></SuccessFC>
      </Suspense>
      <ErrorBoundary>
        <Suspense fallback={<FallbackFC />}>
          <ErrorFC {...{errorPromise}}></ErrorFC>
        </Suspense>
      </ErrorBoundary>
    </section>
  )
};

export default PromiseErrorClient