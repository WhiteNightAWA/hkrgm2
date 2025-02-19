interface StringMap {
    [key: string]: string;
}

export const gamesMap: StringMap = {
    maimai: "MaiMai",
    maimaidx: "MaiMaiDX",
    jubeat: "Jubeat",
    sdvx: "SDVX",
    taiko: "太鼓の達人",
    chunithm: "CHUNITHM",
    gtdr_dm: "GTDR DM",
    gtdr_gf: "GTDR GF",
    reflec: "Reflec Beat",
    iidx: "beatmania IIDX",
    wacca: "WACCA",
    taiko_old: "舊太鼓達人",
    gc: "GROOVE COASTER",
    db: "DANZBASE",
    diva: "Project DIVA Arcade",
    de: "DanceEvolution",
    nostalgia: "Nostalgia",
    dr: "DANCERUSH"
};

export const gameAvatar: { [key: string]: string } = {
    maimai: "https://styles.redditmedia.com/t5_3ce8r/styles/communityIcon_xqndal3bpds51.png",
    maimaidx: "https://styles.redditmedia.com/t5_3ce8r/styles/communityIcon_xqndal3bpds51.png",
    jubeat: "https://e1.pngegg.com/pngimages/341/12/png-clipart-bemani-icons-v6-jubeat-white-and-black-e-letter-logo-thumbnail.png",
    sdvx: "https://cdn2.steamgriddb.com/icon_thumb/95956b13453a5aeea9db63de9ba64dec.png",
    taiko: "https://pbs.twimg.com/profile_images/501238914330271744/znFmAp9R_400x400.jpeg",
    chunithm: "https://chunithm.tw/logo.png"
}

export interface PlaceType {
    distance: number | undefined;
    id: string;
    name: string;
    desc: string;
    nicks: string[];
    place: string;
    placeD: string;
    google: string;
    star: number,
    smoke: number;
    people: number;
    locationX: number;
    locationY: number;
    games: { [key: string]: [number, string, number] };
    coins: boolean;
}

export const PlaceList: StringMap = {
    all: "全部",
    nt: "新界",
    kn: "九龍",
    hki: "香港島"
};


export interface Location {
    latitude: number | null;
    longitude: number | null;
}