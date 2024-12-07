"use client";

import { FC, MouseEvent, useRef, useState } from "react";



const Dialog:FC<{
  dialogRef:React.RefObject<HTMLDialogElement | null>,
  inputText: string
}> = ({dialogRef, inputText}) => {
  function handleCloseDialog(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dialogRef!.current!.close()
  };

  return (
    <dialog ref={dialogRef}>
      <div>{inputText}</div>
      <button type="button" onClick={handleCloseDialog}>close</button>
    </dialog>
  )
}

export const RefSample: FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleConfirm (event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setInputText(inputRef!.current!.value);
    dialogRef?.current?.showModal();
  };

  return (
    <section>
      <h2><code>Ref</code> sample.</h2>
      <div>
        <label htmlFor="ref-sample-text">Refテキスト</label>
        <input type="text" name="ref_sample_text" id="ref-sample-text" defaultValue="" ref={inputRef} />
      </div>
      <button type="button" onClick={handleConfirm}>Confirm</button>
      <Dialog dialogRef={dialogRef} inputText={inputText} />
    </section>
  )
}

export default RefSample