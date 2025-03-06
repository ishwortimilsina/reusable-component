interface Item {
  id: string;
  name: string;
  avatar?: string; // url
  age: number;
}

export const items: Item[] = [
  { "id": "ik0r8rjh", "name": "James Anderson", "avatar": "https://randomuser.me/api/portraits/men/79.jpg", "age": 36 },
  { "id": "9hbcf33y", "name": "Michael Johnson", "avatar": "https://randomuser.me/api/portraits/men/31.jpg", "age": 48 },
  { "id": "lkyvydk6", "name": "William Brown", "avatar": "https://randomuser.me/api/portraits/men/29.jpg", "age": 19 },
  { "id": "0qhxl2np", "name": "David Smith", "avatar": "https://randomuser.me/api/portraits/men/92.jpg", "age": 45 },
  { "id": "s8g3yit2", "name": "John Davis", "avatar": "https://randomuser.me/api/portraits/men/16.jpg", "age": 28 },
  { "id": "cmbayj3f", "name": "Christopher Miller", "avatar": "https://randomuser.me/api/portraits/men/83.jpg", "age": 24 },
  { "id": "ocsvxdqm", "name": "Daniel Wilson", "avatar": "https://randomuser.me/api/portraits/men/14.jpg", "age": 45 },
  { "id": "49zwf2wm", "name": "Matthew Moore", "avatar": "https://randomuser.me/api/portraits/men/56.jpg", "age": 30 },
  { "id": "sddkeuju", "name": "Andrew Taylor", "avatar": "https://randomuser.me/api/portraits/men/45.jpg", "age": 48 },
  { "id": "9rzs2gl2", "name": "Joshua Harris", "avatar": "https://randomuser.me/api/portraits/men/44.jpg", "age": 30 },
  { "id": "4defr886", "name": "Ryan Martin", "avatar": "https://randomuser.me/api/portraits/men/39.jpg", "age": 29 },
  { "id": "6a7ti4a6", "name": "Ethan Thompson", "avatar": "https://randomuser.me/api/portraits/men/16.jpg", "age": 54 },
  { "id": "8eb25oys", "name": "Samuel White", "avatar": "https://randomuser.me/api/portraits/men/65.jpg", "age": 28 },
  { "id": "ocbggugq", "name": "Benjamin Clark", "avatar": "https://randomuser.me/api/portraits/men/68.jpg", "age": 54 },
  { "id": "z0rika64", "name": "Alexander Lewis", "avatar": "https://randomuser.me/api/portraits/men/26.jpg", "age": 47 },
  { "id": "t396r3e6", "name": "Noah Walker", "avatar": "https://randomuser.me/api/portraits/men/55.jpg", "age": 39 },
  { "id": "lqoprcl3", "name": "James King", "avatar": "https://randomuser.me/api/portraits/men/68.jpg", "age": 28 },
  { "id": "4g7ubeni", "name": "David Scott", "avatar": "https://randomuser.me/api/portraits/men/47.jpg", "age": 56 },
  { "id": "zkn0u023", "name": "Mason Young", "avatar": "https://randomuser.me/api/portraits/men/74.jpg", "age": 33 },
  { "id": "unc998lu", "name": "Lucas Adams", "avatar": "https://randomuser.me/api/portraits/men/86.jpg", "age": 40 }
];

function filterUsersByName(substring: string): Item[] {
  return items.filter(user => user.name.toLowerCase().includes(substring.toLowerCase()));
}

export function filterUsersByNameWithDelay(substring: string): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = filterUsersByName(substring);
      resolve(result);
    }, 100);
  });
}
