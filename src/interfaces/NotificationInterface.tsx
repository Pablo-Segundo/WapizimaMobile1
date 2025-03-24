export interface Notification {
    collapseKey:  string;
    data:         Data;
    from:         string;
    messageId:    string;
    notification: Notification;
    sentTime:     number;
    ttl:          number;
}

export interface Data {
    name:   string;
    params: string;
    route:  string;
}

export interface Notification {
    android: Android;
    body:    string;
    title:   string;
}

export interface Android {
    imageUrl: string;
}
