/* tslint:disable */
export namespace ArticleQuery {
  export type Variables = {
    articleId: string;
  };

  export type Query = {
    allFilms?: AllFilms | null;
  };

  export type AllFilms = {
    edges?: Edges[] | null;
  };

  export type Edges = {
    node?: Node | null;
  };

  export type Node = {
    title?: string | null;
  };
}
export namespace ArticlesQuery {
  export type Variables = {};

  export type Query = {
    allFilms?: AllFilms | null;
  };

  export type AllFilms = {
    edges?: Edges[] | null;
  };

  export type Edges = {
    node?: Node | null;
  };

  export type Node = {
    title?: string | null;
  };
}
export namespace OverviewPageQuery {
  export type Variables = {};

  export type Query = {
    allFilms?: AllFilms | null;
  };

  export type AllFilms = {
    edges?: Edges[] | null;
  };

  export type Edges = {
    node?: Node | null;
  };

  export type Node = {
    title?: string | null;
  };
}
