export interface headerProps {
    isLoggedin? : boolean,
    user? : userP
}

export interface userProps {
    token : string,
    email : string,
    password : string,
    username : string,
    bio? : string,
    image? : string
}

export type userP = userProps | undefined | null

export interface urlTypes  {
    baseUrl: string,
    profileUrl : string,
    tagsUrl: string,
    signUpUrl: string,
    signInUrl: string,
    localStorageKey: string,
    userVerifyURL : string,
}

export interface similarProps {
    user? : userP,
    updateUser? : (user:userProps) => void,
    handleLogout? : (value?:string) => void,
}

export interface unauthenticatedAppProps {
    user? : userP,
    updateUser : (user: userProps) => any,
    handleLogout? : () => void,
}

export interface signinProps {
    updateUser : (user: userProps) => any,
    handleLogout? : () => void,
}

export interface signupProps {
    updateUser : (user: userProps) => any,
    handleLogout? : () => void,
}

export interface tagsProps {
    handleClick : (name:any,value:any,num:any) => any,
    activeTag  : string,
    allTags  : Array<string>
}

export interface articleProps {
    author : {
        image : string,
        username : string
    },
    updatedAt : string,
    favoritesCount  :number,
    slug : string,
    description : string,
    tagList : Array<string>
}

export interface articlesProps { 
    token? : string, 
    activeTag? : string,
    articles :  any,
    update? : boolean | string
}