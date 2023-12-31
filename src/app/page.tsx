'use client'
import styles from './page.module.css'
import {useState} from "react";

const vowelList = ['a', 'e', 'i', 'o', 'u'];
const consonantList = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
    'n', 'p', 'r', 's', 't', 'v', 'w', '', 'y',
    'z'];

const consantsStart = [...consonantList, 'st', 'sh', 'st', 'ch',];
const consantsMiddle = [...consonantList, 'st', 'sh', 'nv', 'st', 'ch', 'rt', 'tt', 'ss'];
const consantsEnd = [...consonantList, 'st', 'sh', 'st', 'ch', 'rt'];

function approxCountSyllables(word: string) {
    word = word.toLowerCase();                                     // Convert to lowercase
    if (word.length <= 3) return 1;                                // Return 1 for words of 3 letters or less

    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');  // Remove final -es, -ed, or -e
    word = word.replace(/^y/, '');                                 // Remove starting y
    return word.match(/[aeiouy]{1,2}/g)?.length || 0;                    // Count vowel groups
}

export default function Home() {

    const [name, setName] = useState<string>("");

    const genName = () => {
        const names = Array.from({length: 10}, () => {

            let name = '';

            while (!name) {

                // if 50% chance of adding first consant
                const hasFirstConsant = Math.random() > 0.5;
                if (hasFirstConsant) {
                    name += consantsStart[Math.floor(Math.random() * consantsStart.length)];
                }
                // add a vowel
                name += vowelList[Math.floor(Math.random() * vowelList.length)];

                // 75% chance of middle one (100% if no first one)
                if (!hasFirstConsant || Math.random() > 0.25) {
                    name += consantsMiddle[Math.floor(Math.random() * consantsMiddle.length)];
                }

                // add a vowel
                name += vowelList[Math.floor(Math.random() * vowelList.length)];

                // if 50% chance of adding last consant
                const hasLastConsant = name.length < 3 ? 1 : name.length < 4 ? Math.random() > 0.2 : Math.random() > 0.5;
                if (hasLastConsant) {
                    name += consantsEnd[Math.floor(Math.random() * consantsEnd.length)];
                } else {
                    // make sure last vowel is a or i
                    // remove last vowel
                    name = name.slice(0, -1);
                    const smallVowelList = ['a', 'i']
                    name += smallVowelList[Math.floor(Math.random() * smallVowelList.length)];
                }

                if (name.startsWith('u') || name.startsWith('r') || name.startsWith('v')) {
                    // start again
                    name = '';
                }
                if(approxCountSyllables(name) < 2){
                    name = '';
                }
                            }

            return name;
        })


        setName(names.join('\n'));
    }

    return (
        <main className={styles.main}>
            <svg width="64" height="64" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.437 77.2651C14.1592 76.6357 13.4319 76.315 12.8447 76.6736C10.3818 78.1776 8.83811 81.2812 9.50379 84.1658C10.3317 87.7534 12.6553 90.4603 16.2429 89.6324L18.9451 89.0299C19.8388 88.8306 20.2422 87.7835 19.7379 87.0193C17.7331 83.9818 15.9069 80.5959 14.437 77.2651Z"
                    fill="currentColor"/>
                <path
                    d="M67.8477 73.3555C67.1657 73.9293 67.2251 75.012 67.9942 75.4624C74.9288 79.5237 82.5647 82.2973 90.533 83.6253L108.237 86.576C111.869 87.1813 115.538 85.9132 116.144 82.2814C116.749 78.6496 114.248 76.7391 110.616 76.1338L92.1599 71.5667C86.6485 70.6481 81.8215 67.9249 76.9714 65.2178C76.34 64.8653 75.5436 65.1081 75.1445 65.7112C73.365 68.4005 70.1399 71.4269 67.8477 73.3555Z"
                    fill="currentColor"/>
                <path
                    d="M49.3332 46.4931C49.3332 51.2489 50.9932 56.6522 53.1061 60.9429C53.4094 61.5588 54.158 61.8045 54.7538 61.4636C59.593 58.695 62.6666 53.7201 62.6666 44.5867C62.6666 40.6878 64.3771 37.8115 67.6548 35.0499C68.5435 34.3012 72.4516 32.024 73.5326 31.5976C79.4218 29.2742 87.8116 28.4605 96.4298 36.1448C97.1906 36.9912 98.9159 39.2919 99.8143 41.8047C99.8412 41.8798 99.8725 41.9491 99.9111 42.0189C101.749 45.3375 103.972 54.8482 99.0691 67.8236C98.8042 68.5246 99.1739 69.3119 99.8893 69.5354L110.879 72.9683C111.553 73.1789 112.272 72.8031 112.469 72.1246C116.769 57.2895 114.656 42.8792 112.109 36.6657C110.687 32.464 107.414 28.6004 105.955 27.1938C94.5285 15.7676 76.5749 13.6718 62.8809 22.3862C50.2522 29.5458 49.3332 39.3929 49.3332 46.4931Z"
                    fill="currentColor"/>
                <path
                    d="M22.0452 27.1938C31.8062 17.4328 46.3306 14.4809 58.8937 19.2603C59.8785 19.635 59.9217 20.9704 59.0077 21.4943C54.5242 24.0641 52.1261 26.0236 51.085 27.1261C50.7159 27.5168 50.1746 27.7555 49.6424 27.6803C43.2158 26.7726 36.8956 28.6844 31.9999 33.2801C29.4796 35.646 27.9175 38.9428 26.8799 42.2401C24.0556 51.2149 23.1635 58.1809 25.5999 66.0989C29.0681 77.3703 35.9454 89.101 46.1845 94.952C54.4778 99.9778 61.4234 100.242 63.8953 99.8573C63.9672 99.8461 64.035 99.8403 64.1078 99.8396C68.4179 99.7998 75.5395 97.3869 81.643 93.4401C85.3228 91.0606 86.7586 89.8464 87.9454 86.8025C88.1763 86.2102 88.784 85.8433 89.4098 85.9554L102.174 88.2428C103.117 88.4118 103.544 89.5173 102.931 90.2534C98.4761 95.5994 93.5039 99.238 86.4146 104.204C76.2833 111.3 67.4231 111.406 64.0001 111.616C60.4311 111.857 52.8408 111.242 41.5854 104.204C27.0345 95.1043 18.5857 84.4063 14.1213 69.8972C10.756 58.9602 11.3829 47.1836 15.8905 36.6657C16.7571 34.4663 17.9199 31.3191 22.0452 27.1938Z"
                    fill="currentColor"/>
                <path
                    d="M31.7645 73.243C33.3921 77.1291 35.6768 80.649 39.0875 83.4111C39.3932 83.6587 39.7989 83.7401 40.1788 83.6379C44.0506 82.775 54.0718 79.6958 66.5919 71.087C66.6218 71.0665 66.6494 71.0428 66.6742 71.0163C70.8302 66.5701 76.9541 61.3263 78.6667 44.5867C79.0137 41.1957 77.981 37.9485 76.6016 34.9238C76.3243 34.3158 75.6186 34.0441 75.0062 34.3114C73.8189 34.8295 71.8363 35.7499 69.9502 36.8779C67.0432 38.6164 65.502 41.2743 65.334 44.064C65.3285 44.155 65.3346 44.245 65.3491 44.335C66.1367 49.233 64.6003 56.8071 58.8799 62.7201C51.6697 70.1729 39.7447 71.3979 32.9351 71.5182C32.0428 71.534 31.4198 72.4198 31.7645 73.243Z"
                    fill="currentColor"/>
            </svg>

            <p className={styles.name}>{name}</p>
            <button className={styles.button} onClick={() => genName()}>Generate Names</button>
        </main>
    )
}
