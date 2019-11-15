import React, { useContext } from 'react'
import { GlobalStateContext} from "../providers/GlobalStateProvider";

export const Home = () => {
  const { setPageTitle } = useContext(GlobalStateContext)
  setPageTitle('Home')

    return (
        <div>
            Home page
        </div>
    )
}
