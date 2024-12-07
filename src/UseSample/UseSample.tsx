"use client";

import { FC, Suspense, use, useState } from "react";

type NameAge = {
  name: string,
  age: number,
}
const dammyData:NameAge[] = [
  {name: 'tonakai', age: 64},
  {name: 'santa', age: 35},
  {name: 'summer', age: 76},
  {name: 'winter', age: 95},
] 

function fetchmock(indexNumber:number) {
  return new Promise<NameAge>((resolve) => {
    setTimeout(resolve, 100, dammyData[indexNumber]);
  })
}

const ShowNameAgeData:FC<{nameAgePromise: Promise<NameAge>}> = ({nameAgePromise}) => {
  const nameAgeData = use(nameAgePromise);
  return (
    <div>
      {JSON.stringify(nameAgeData)}
    </div>
  )
}

export const UseSample: FC = () => {
  const [nameAgeIndex, setNameAgeIndex] = useState<number>(1);
  const nameAgePromise = fetchmock(nameAgeIndex);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget!.value) - 1;
    if (value >= 0 && value < dammyData.length) {
      setNameAgeIndex(value);
    }
  }

  return (
    <section>
      <h2><code>use</code> API sample.</h2>
      <div>
        <label htmlFor="use-sample-input">入力</label>
        <input type="number" min={1} max={dammyData.length} defaultValue={1} step={1} onChange={handleChange} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowNameAgeData {...{nameAgePromise}} />
      </Suspense>
    </section>
  )
}

export default UseSample