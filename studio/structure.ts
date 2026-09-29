import type { StructureResolver } from "sanity/structure";
import { HomeIcon } from "@sanity/icons/Home";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home")
        .icon(HomeIcon)
        .child(S.document().schemaType("home").documentId("home")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
    ]);
