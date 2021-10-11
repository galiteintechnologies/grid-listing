import React from "react";

const GridComponent = ({
  SearchBoxComponent,
  PlaceHolderText,
  SearchBoxStyle,
  RemoveSearch,
  setFilterBySearch,
  SearchBoxClass,
  SearchString,
  DisplayExport,
  IsAllowExport,
  IsAllowAllButtons,
  DefaultButton,
  ExportIcon,
  ExportText,
  ExportClass,
  PreviewPDFReport,
  PrimaryButton,
  IsAllowWriteInfo,
  AddIcon,
  AddButtonClass,
  OpenAddForm,
  AddButtonText,
  OpenColumnPanel,
  RemoveSearchButton,
  SearchPara,
  TableHead,
  TableBody,
  ColumnIndex,
  SortData,
  OrderBy,
  ModuleId,
  AllowAccess,
  CommonGetSiteDataApi,
  GetEditableData,
  ViewApi,
  SetLoading,
  ViewFormUrl,
  EditFormUrl,
  ToggleHideDialog,
  ConfirmArchive,
  ExportPdfReport,
  ReportName,
  AllowViewInfo,
  AllowExportInfo,
  AllowEditInfo,
  AllowDeleteInfo,
  AllowPrimaryInfo,
  AssignApi,
  SetFieldsAsPrimary,
  EntityName = "",
  FieldId = "",
  TotalRecord,
  PostsPerPage,
  CheckSpinner,
  LoadMoreData,
  SpinnerButton,
  Dispatch,
  History,
  toggleHideDialog,
  alertClicked,
  ArchiveButtonText,
  IsArchive,
  IsAllowArchive,
  ToggleArchiveClientList,
  UseParamsData,
  MenuItems,
  RemoveAdvFilter,
  IsAllowDragDrop,
  HandleDragDrop,
  ChangeOrderButtonText,
  IsModalOpen,
  AllowModelOpen,
}) => {
  return (
    <React.Fragment>
      <div
        className="d-flex table__search__panel"
        style={{
          flexWrap: "wrap",
          justifyContent: "space-between",
          order: "1",
        }}
      >
        <div
          className="search-part"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <SearchBoxComponent
            styles={SearchBoxStyle}
            className={SearchBoxClass}
            placeholder={PlaceHolderText}
            onClear={(ev) => {
              setFilterBySearch("");
              localStorage.removeItem(RemoveSearch);
            }}
            onChange={(_, newValue) => setFilterBySearch(newValue)}
            onSearch={(newValue) => setFilterBySearch(newValue)}
            value={SearchString}
          />
          <PrimaryButton
            className="mb-2 button__create add__filter"
            secondaryText="Opens the Sample Dialog"
            text="Add filters"
            iconProps={{ iconName: "filter" }}
            onClick={toggleHideDialog}
          />
          {RemoveAdvFilter && SearchPara && SearchPara.length ? (
            <RemoveSearchButton
              iconProps={{ iconName: "Cancel" }}
              title="Remove filter"
              onClick={alertClicked}
            />
          ) : (
            ""
          )}
          <PrimaryButton
            className="mb-2 ml-2 predefine-filters"
            secondaryText="Opens the Sample Dialog"
            text="Filter"
            iconProps={{ iconName: "filter" }}
            menuProps={MenuItems}
          />
        </div>
        <div
          className="actions-button-grid text-left"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {DisplayExport && IsAllowExport && IsAllowAllButtons && (
            <DefaultButton
              iconProps={ExportIcon}
              text={ExportText}
              className={ExportClass}
              onClick={PreviewPDFReport}
            />
          )}
          {IsAllowDragDrop && (
            <PrimaryButton
              iconProps={{ iconName: "Move" }}
              text={ChangeOrderButtonText}
              className={AddButtonClass}
              onClick={HandleDragDrop}
            />
          )}
          {IsAllowAllButtons && IsAllowWriteInfo && (
            <PrimaryButton
              iconProps={AddIcon}
              text={AddButtonText}
              className={AddButtonClass}
              onClick={!AllowModelOpen ? OpenAddForm : IsModalOpen}
            />
          )}
          <PrimaryButton
            iconProps={{ iconName: "MultiSelect" }}
            text="Columns"
            className="p-3 mb-2 float-sm-right button__create"
            onClick={OpenColumnPanel}
          />
          {IsAllowArchive && (
            <PrimaryButton
              iconProps={{ iconName: "Archive" }}
              text={ArchiveButtonText}
              className="p-3 ml-2 mb-2 float-sm-right button__create"
              onClick={ToggleArchiveClientList}
            />
          )}
        </div>
      </div>
      <div style={{ order: "3" }}>
        <p className="float-left mb-0">
          {TotalRecord ? `${TotalRecord} record found` : "0 record found"}
        </p>
      </div>
      <div className="table-responsive" style={{ order: "4" }}>
        <table className="table table-striped table-hover text-left listing__table__data mt-2">
          {TableHead && TableHead.length > 0 && (
            <thead>
              <tr key={TableHead.length}>
                {TableHead.map((fields, index) => (
                  <th
                    className={`tablefields_${index} ${
                      ColumnIndex === fields.entity
                        ? OrderBy === "ASC"
                          ? "sort_asc"
                          : "sort_desc"
                        : ""
                    }`}
                    onClick={() => SortData(fields.entity, fields.entity)}
                    key={index}
                  >
                    <span style={{ fontWeight: "600" }}>
                      {fields.text === "Id" ? "Sr. No" : fields.text}
                    </span>
                  </th>
                ))}
                {TableHead.length > 0 &&
                  !AllowModelOpen &&
                  (AllowAccess.can_read ||
                    AllowAccess.can_delete ||
                    ModuleId === "1" ||
                    ModuleId === "2" ||
                    ModuleId === "5" ||
                    ModuleId === "6") &&
                  IsAllowAllButtons && (
                    <th style={{ textAlign: "center" }}>Action</th>
                  )}
              </tr>
            </thead>
          )}
          {TableBody && (
            <tbody>
              {TableBody.length > 0 ? (
                TableBody.map((fields, index) => {
                  let firstName = fields.hasOwnProperty("first_name")
                    ? fields.first_name
                    : "";
                  let lastName = fields.hasOwnProperty("last_name")
                    ? fields.last_name
                    : "";
                  let viewRemoveData = fields.hasOwnProperty("action");
                  let isAllowViewRemove =
                    viewRemoveData && fields.action === "remove" ? false : true;
                  return (
                    <tr
                      key={index}
                      title={`${AllowEditInfo ? "Edit" : ""}`}
                      className="every_row"
                      onClick={() =>
                        AllowEditInfo
                          ? CommonGetSiteDataApi(
                              ViewApi,
                              fields.id,
                              SetLoading,
                              History,
                              Dispatch,
                              `${EditFormUrl}/${fields.id}`,
                              GetEditableData
                            )
                          : ""
                      }
                    >
                      {Object.keys(fields).map(
                        (objValue, i) =>
                          objValue !== "isPrimary" &&
                          objValue !== "clientId" &&
                          (objValue !== "first_name" ? (
                            <td key={i}>
                              {objValue === "id"
                                ? index + 1
                                : changeValueFormat(TableBody[index][objValue])}
                            </td>
                          ) : firstName !== "" ? (
                            <td key={i}>{createAvatar(firstName, lastName)}</td>
                          ) : (
                            ""
                          ))
                      )}
                      {((AllowViewInfo && AllowAccess.can_read) ||
                        (AllowDeleteInfo && AllowAccess.can_delete) ||
                        AllowExportInfo ||
                        AllowPrimaryInfo ||
                        IsAllowAllButtons) &&
                        !AllowModelOpen && (
                          <td
                            style={{
                              textAlign: "center",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {AllowViewInfo && AllowAccess.can_read && (
                              <span
                                title="View"
                                className="button__edit ml-0 ml-sm-2"
                                onClick={(e) => {
                                  CommonGetSiteDataApi(
                                    ViewApi,
                                    fields.id,
                                    SetLoading,
                                    History,
                                    Dispatch,
                                    `${ViewFormUrl}/${fields.id}`,
                                    GetEditableData
                                  );
                                  e.stopPropagation();
                                }}
                              >
                                <i
                                  className="fa fa-eye text-dark"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                            {AllowDeleteInfo &&
                              AllowAccess.can_delete &&
                              (fields.hasOwnProperty("clientId") ? (
                                UseParamsData === fields.clientId ? (
                                  <span
                                    title="Delete"
                                    className="button__delete ml-1 ml-sm-2"
                                    onClick={(e) => {
                                      ToggleHideDialog(
                                        "open",
                                        fields.id,
                                        EntityName,
                                        FieldId
                                      );
                                      e.stopPropagation();
                                    }}
                                  >
                                    <i
                                      className="fa fa-trash-o text-dark"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                ) : (
                                  "-"
                                )
                              ) : (
                                <span
                                  title="Delete"
                                  className="button__delete ml-1 ml-sm-2"
                                  onClick={(e) => {
                                    ToggleHideDialog(
                                      "open",
                                      fields.id,
                                      EntityName,
                                      FieldId
                                    );
                                    e.stopPropagation();
                                  }}
                                >
                                  <i
                                    className="fa fa-trash-o text-dark"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              ))}
                            {AllowExportInfo && (
                              <span
                                title="Export PDF"
                                className="ml-1 ml-sm-2"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  ExportPdfReport(
                                    ModuleId,
                                    ReportName,
                                    fields.id
                                  );
                                  e.stopPropagation();
                                }}
                              >
                                <i
                                  className="fa fa-download text-dark"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            )}
                            {IsAllowArchive && (
                              <span
                                title={
                                  IsArchive
                                    ? "Un-Archive Client"
                                    : "Archive Client"
                                }
                                className="ml-1 ml-sm-2"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  ConfirmArchive(
                                    "open",
                                    fields.id,
                                    EntityName,
                                    FieldId
                                  );
                                  e.stopPropagation();
                                }}
                              >
                                <i
                                  className="fa fa-archive text-dark"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            )}
                            {AllowPrimaryInfo &&
                            fields.hasOwnProperty("clientId")
                              ? UseParamsData === fields.clientId &&
                                fields.hasOwnProperty("isPrimary") &&
                                !fields.isPrimary && (
                                  <span
                                    title="Mark as primary"
                                    className="button__edit ml-1 ml-sm-2"
                                    onClick={() =>
                                      SetFieldsAsPrimary(AssignApi, fields.id)
                                    }
                                  >
                                    <i
                                      className="fa fa-thumb-tack text-dark"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                )
                              : fields.hasOwnProperty("isPrimary")
                              ? !fields.isPrimary && (
                                  <span
                                    title="Mark as primary"
                                    className="button__edit ml-1 ml-sm-2"
                                    onClick={() =>
                                      SetFieldsAsPrimary(AssignApi, fields.id)
                                    }
                                  >
                                    <i
                                      className="fa fa-thumb-tack text-dark"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                )
                              : ""}
                          </td>
                        )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={TableHead.length + 1}>No records found</td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
      {TotalRecord > PostsPerPage && (
        <React.Fragment>
          {CheckSpinner ? (
            <SpinnerButton
              label="Loading..."
              ariaLive="assertive"
              labelPosition="right"
              style={{ order: "5", margin: "0 auto" }}
            />
          ) : (
            <PrimaryButton
              type="reset"
              text="Load more"
              style={{ order: "5", margin: "0 auto" }}
              onClick={() => LoadMoreData(PostsPerPage)}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default GridComponent;

function getRandomColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}

function createAvatar(name = "", secondName = "") {
  if (name === "") return "";

  let avatar = "";
  if (secondName === "") {
    let makeShortName = name.split(" ");
    if (makeShortName.length > 1)
      avatar = makeShortName[0].charAt(0).concat(makeShortName[1].charAt(0));
    else avatar = makeShortName[0].charAt(0);
  } else {
    avatar = name.charAt(0).concat(secondName.charAt(0));
  }
  let avatarHtml = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        className="header__short__username"
        style={{
          padding: "0",
          fontSize: "10px",
          width: "25px",
          height: "25px",
          margin: "0",
          backgroundColor: getRandomColor(),
        }}
        title={name}
      >
        <span className="font-weight-bold text-uppercase">{avatar}</span>
      </div>
      <span className="ml-2" style={{ width: "calc(100% - 25px)" }}>
        {name}
      </span>
    </div>
  );
  return avatarHtml;
}

function changeValueFormat(dateString) {
  if (dateString !== null) {
    if (typeof dateString === "object")
      return dateString.date.split(".")[0].trim();
    else if (typeof dateString === "boolean") return dateString ? "Yes" : "No";
    else return dateString;
  } else {
    return "---";
  }
}
