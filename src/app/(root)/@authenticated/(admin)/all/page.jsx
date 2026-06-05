import React from 'react'
import Alltaskslist from './_component/alltaskslist'

function Alltaskspage() {
  return (
    <>
        <div className="flex gap-4 overflow-x-auto">
            <Alltaskslist/>
        </div>
    </>
  )
}

export default Alltaskspage