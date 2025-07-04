interface StringMap {
    [key: string]: string;
}

export interface UserInterface {
    username: string;
    id: string;
    avatar: string;
    email: string;
    admin: boolean;
}
export const MachineProblemsListTran: StringMap = {
    mon: "螢幕",
    touch: "觸控",
    button: "掣",
    jack: "耳機窿",
    light: "LED",
    screen: "螢幕(上面)"
}
export const MachineProblemsList: { [key: string]: string[] } = {
    "maimaidx": ["mon", "touch", "button", "jack", "light", "screen"]
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
    chunithm: "https://chunithm.tw/logo.png",
    gc: "https://groovecoaster.com/apps/images/gc2_logo_mark.png"
}

export interface PlaceType {
    openings: { [key: string]: string } | null;
    close: number;
    id: string;
    name: string;
    desc: string;
    nicks: string[];
    place: string;
    placeD: string;
    google: string;
    star: number | null;
    smoke: number;
    people: number;
    locationX: number;
    locationY: number;
    games: { [key: string]: [number, string, number] };
    coins: boolean;
    links: StringMap;
    img: string;
    distance: number | undefined;
    last_edit: string;
    check: number;
}

export interface DBPlaceType {
    openings: string;
    id: string;
    name: string;
    desc: string;
    nicks: string;
    place: string;
    placeD: string;
    google: string;
    star: number,
    smoke: number;
    people: number;
    locationX: number;
    locationY: number;
    games: string;
    coins: boolean;
    links: string;
    img: string;
    distance: number | undefined;
    last_edit: string;
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

export interface PlacesInterface {
    data: { [key: string]: PlaceType };
    loadData: () => void;
}


export const mobileCheck = function() {
    let check = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

export function isWeakJson(item: string): boolean {
    try {
        JSON.parse(item);
        return true;
    } catch (_) {
        return false;
    }
}
export function isJson(item: string): boolean {
    let value = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
        value = JSON.parse(value);
    } catch (_) {
        return false;
    }

    return typeof value === "object" && value !== null;
}