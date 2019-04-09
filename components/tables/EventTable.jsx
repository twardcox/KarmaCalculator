import * as React from "react";
import { Grid, Tooltip } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import StartIcon from "@material-ui/icons/timer";
import TableHOC from "./Table";
import IconButton from "../widgets/IconButton";

export default (props) => {

    const row = (data, rowIndex) =>
    [
        data.name || "",
        data.start ? new Date(data.start).toLocaleString() : "",
        <Grid container justify={"flex-end"}>
            {props.launchCheckIn &&
            <Grid item>
                <IconButton
                    size="small"
                    variant="text"
                    color="primary"
                    onClick={(e) => {
                        e.preventDefault();
                        props.launchCheckIn(data.eventId);
                    }}
                    icon={StartIcon}
                >
                    {data.started ? "continue" : "start"}
                </IconButton>
            </Grid>}
            {props.editEvent &&
            <Grid item>
                <Tooltip title="Started events cannot be edited" disableFocusListener={!data.started} disableHoverListener={!data.started} disableTouchListener={!data.started}>
                    <span>
                        <IconButton size="small"
                            variant="text"
                            color="secondary"
                            disabled={data.started}
                            icon={CreateIcon}
                            onClick= { (e) => {
                                e.preventDefault();
                                props.editEvent(data);
                            }}
                        >
                            edit
                        </IconButton>
                    </span>
                </Tooltip>
            </Grid>
            }
        </Grid>
    ];

    const header = () => [
        { label: "Name", name: "name", isSortable: true },
        { label: "Date", name: "start", isSortable: true },
        { label: "" }
    ];

    const HocTable = TableHOC(row, header);

    return (<HocTable data={props.data} onDataChange={props.onDataChange} sortField="start" sortAscending={false} title="Events" loading={props.loading} />);
}
