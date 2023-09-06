export type Actype = 'like' | 'love' | 'disLike' | 'comment'
export interface NotiFicationSChema {
    id: string,
    userId: string,
    seen: boolean | false,
    time: string,
    url: string,
    notification: {
        actuserId: string,
        actUserPic: string,
        actUserName: string,
        actType: Actype,
        msg: string
    }
}
export type Decoded = {
    data: {
        id: string,
        name: string
    }
}

export interface GroupArtcredential {
    decoded: Decoded,
    name: string
}

export interface AddtoGroupCredentila {
    decoded: Decoded,
    artID: string,
    imgUrl: string,
    artGroupID:string,
    uuid:string
}

export interface GetGroupCredential {
    decoded: Decoded,
    artGroupID:string
}

