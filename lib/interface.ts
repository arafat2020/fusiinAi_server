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
        actType:Actype,
        msg: string
    }
}

