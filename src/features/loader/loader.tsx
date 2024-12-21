import {Loader as LoaderComponent, LoaderProps} from '@mantine/core'
import CircularProgress from '@mui/material/CircularProgress';

export function Loader(props: LoaderProps) {
    return (
        <div className={"loader-container"}>
      <CircularProgress />
        </div>
    );

}
