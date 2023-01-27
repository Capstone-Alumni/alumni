"use client";

import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState } from 'react';
import heartFill from '@iconify/icons-eva/heart-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { styled } from '@mui/material';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// redux
// routes
// hooks
// components
import {
    Profile,
    ProfileCover,
    ProfileFriends,
    ProfileGallery,
    ProfileFollowers
} from '../../share/components/_dashboard/user/profile';
import { UserPost } from '@share/type';
import UserCreate from '@share/components/_dashboard/user/profile/UserCreate';
import { currentTenantSubdomainSelector } from 'src/redux/slices/currentTenantSlice';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import {  currentUserState } from 'src/redux/slices/currentUserSlice';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
    zIndex: 9,
    bottom: 0,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'center'
    },
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(3)
    }
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
    const [currentTab, setCurrentTab] = useState('profile');
    const [findFriends, setFindFriends] = useState('');
    const currentUser = useAppSelector((state: RootState) => state.currentUser);

    const myProfile = {
        "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-1",
        "cover": "/static/mock-images/covers/cover_1.jpg",
        "position": "UI Designer",
        "follower": 72403,
        "following": 5459,
        "quote": "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..",
        "country": "Lesotho",
        "email": "Wendy62@yahoo.com",
        "company": "Keebler, Feeney and Walsh",
        "school": "Kuhic, Collins and Kerluke",
        "role": "Manager",
        "facebookLink": "https://www.facebook.com/caitlyn.kerluke",
        "instagramLink": "https://www.instagram.com/caitlyn.kerluke",
        "linkedinLink": "https://www.linkedin.com/in/caitlyn.kerluke",
        "twitterLink": "https://www.twitter.com/caitlyn.kerluke"
    }
    const posts = [
        {
            id: "68b3e4dd-5e2c-4886-917a-33b0fe795ab6",
            author: {
                id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-1",
                avatarUrl: "/static/mock-images/avatars/avatar_1.jpg",
                name: "Caitlyn Kerluke"
            },
            isLiked: true,
            createdAt: new Date("2022-11-05T14:48:43.024Z"),
            media: "/static/mock-images/covers/cover_1.jpg",
            message: "Enim dolorem est itaque quia ad minus officia quibusdam.",
            personLikes: [
                {
                    name: "Mrs. Claire Emmerich",
                    avatarUrl: "/static/mock-images/avatars/avatar_2.jpg"
                },
                {
                    name: "Clifton Bogisich",
                    avatarUrl: "/static/mock-images/avatars/avatar_3.jpg"
                },
                {
                    name: "Michael Abbott Sr.",
                    avatarUrl: "/static/mock-images/avatars/avatar_4.jpg"
                },
                {
                    name: "Shawn Kemmer",
                    avatarUrl: "/static/mock-images/avatars/avatar_5.jpg"
                },
                {
                    name: "Rose Ratke",
                    avatarUrl: "/static/mock-images/avatars/avatar_6.jpg"
                },
                {
                    name: "Kyle Rippin",
                    avatarUrl: "/static/mock-images/avatars/avatar_7.jpg"
                },
                {
                    name: "Matthew Daniel",
                    avatarUrl: "/static/mock-images/avatars/avatar_8.jpg"
                },
                {
                    name: "Ms. Glenda Runolfsson",
                    avatarUrl: "/static/mock-images/avatars/avatar_9.jpg"
                },
                {
                    name: "Mrs. Emilio Langworth",
                    avatarUrl: "/static/mock-images/avatars/avatar_10.jpg"
                },
                {
                    name: "Floyd Wilderman",
                    avatarUrl: "/static/mock-images/avatars/avatar_11.jpg"
                },
                {
                    name: "Sandra Oberbrunner",
                    avatarUrl: "/static/mock-images/avatars/avatar_12.jpg"
                },
                {
                    name: "Hazel Franecki",
                    avatarUrl: "/static/mock-images/avatars/avatar_13.jpg"
                },
                {
                    name: "Lynette Spinka Jr.",
                    avatarUrl: "/static/mock-images/avatars/avatar_14.jpg"
                },
                {
                    name: "Nancy Bailey",
                    avatarUrl: "/static/mock-images/avatars/avatar_15.jpg"
                },
                {
                    name: "Raul Homenick",
                    avatarUrl: "/static/mock-images/avatars/avatar_16.jpg"
                },
                {
                    name: "Mable Sporer",
                    avatarUrl: "/static/mock-images/avatars/avatar_17.jpg"
                },
                {
                    name: "Brent Schiller",
                    avatarUrl: "/static/mock-images/avatars/avatar_18.jpg"
                },
                {
                    name: "Peter Emard",
                    avatarUrl: "/static/mock-images/avatars/avatar_19.jpg"
                },
                {
                    name: "Albert Berge",
                    avatarUrl: "/static/mock-images/avatars/avatar_20.jpg"
                },
                {
                    name: "Mr. Jared Hane",
                    avatarUrl: "/static/mock-images/avatars/avatar_21.jpg"
                },
                {
                    name: "Ms. Pam Kautzer",
                    avatarUrl: "/static/mock-images/avatars/avatar_22.jpg"
                },
                {
                    name: "Loretta Shanahan",
                    avatarUrl: "/static/mock-images/avatars/avatar_23.jpg"
                },
                {
                    name: "Mrs. Matthew Kilback",
                    avatarUrl: "/static/mock-images/avatars/avatar_24.jpg"
                },
                {
                    name: "Leon Heller",
                    avatarUrl: "/static/mock-images/avatars/avatar_25.jpg"
                },
                {
                    name: "Vickie Bergnaum",
                    avatarUrl: "/static/mock-images/avatars/avatar_26.jpg"
                },
                {
                    name: "Ramiro Nienow",
                    avatarUrl: "/static/mock-images/avatars/avatar_27.jpg"
                },
                {
                    name: "May Mohr",
                    avatarUrl: "/static/mock-images/avatars/avatar_28.jpg"
                },
                {
                    name: "Teri Hamill",
                    avatarUrl: "/static/mock-images/avatars/avatar_29.jpg"
                },
                {
                    name: "Adrienne Kovacek V",
                    avatarUrl: "/static/mock-images/avatars/avatar_30.jpg"
                },
                {
                    name: "Jerome Herman",
                    avatarUrl: "/static/mock-images/avatars/avatar_31.jpg"
                },
                {
                    name: "Kerry Koch",
                    avatarUrl: "/static/mock-images/avatars/avatar_32.jpg"
                },
                {
                    name: "Kristy Rippin",
                    avatarUrl: "/static/mock-images/avatars/avatar_33.jpg"
                },
                {
                    name: "Lynda Nienow IV",
                    avatarUrl: "/static/mock-images/avatars/avatar_34.jpg"
                },
                {
                    name: "Nancy Stiedemann",
                    avatarUrl: "/static/mock-images/avatars/avatar_35.jpg"
                },
                {
                    name: "Vicky Greenholt DVM",
                    avatarUrl: "/static/mock-images/avatars/avatar_36.jpg"
                },
                {
                    name: "Ian Lubowitz",
                    avatarUrl: "/static/mock-images/avatars/avatar_37.jpg"
                },
                {
                    name: "Lula Auer",
                    avatarUrl: "/static/mock-images/avatars/avatar_38.jpg"
                },
                {
                    name: "Amelia Walter",
                    avatarUrl: "/static/mock-images/avatars/avatar_39.jpg"
                },
                {
                    name: "Delia Collier",
                    avatarUrl: "/static/mock-images/avatars/avatar_40.jpg"
                },
                {
                    name: "Angela Deckow PhD",
                    avatarUrl: "/static/mock-images/avatars/avatar_41.jpg"
                },
                {
                    name: "Renee Schuppe",
                    avatarUrl: "/static/mock-images/avatars/avatar_42.jpg"
                },
                {
                    name: "Robin Mraz",
                    avatarUrl: "/static/mock-images/avatars/avatar_43.jpg"
                },
                {
                    name: "Brandi Wilderman",
                    avatarUrl: "/static/mock-images/avatars/avatar_44.jpg"
                },
                {
                    name: "Ms. Tommie Donnelly",
                    avatarUrl: "/static/mock-images/avatars/avatar_45.jpg"
                },
                {
                    name: "Elizabeth Grant",
                    avatarUrl: "/static/mock-images/avatars/avatar_46.jpg"
                },
                {
                    name: "Madeline Dickens",
                    avatarUrl: "/static/mock-images/avatars/avatar_47.jpg"
                },
                {
                    name: "Henry Block Sr.",
                    avatarUrl: "/static/mock-images/avatars/avatar_48.jpg"
                },
                {
                    name: "Percy Becker",
                    avatarUrl: "/static/mock-images/avatars/avatar_49.jpg"
                },
                {
                    name: "Lindsay Abbott",
                    avatarUrl: "/static/mock-images/avatars/avatar_50.jpg"
                },
                {
                    name: "Isabel Davis",
                    avatarUrl: "/static/mock-images/avatars/avatar_51.jpg"
                }
            ],
            comments: [
                {
                    id: "0615e7db-f5fd-444a-9253-1a9429bb64b4",
                    author: {
                        id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-2",
                        avatarUrl: "/static/mock-images/avatars/avatar_6.jpg",
                        name: "Kathleen Zemlak"
                    },
                    createdAt: new Date("2022-11-05T14:48:43.024Z"),
                    message: "Dolorem dolor aspernatur distinctio."
                },
                {
                    id: "c7c04f51-32cb-4d67-a028-7c9097f3d2f1",
                    author: {
                        id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-3",
                        avatarUrl: "/static/mock-images/avatars/avatar_8.jpg",
                        name: "Geraldine Wiegand"
                    },
                    createdAt: new Date("2022-11-05T14:48:43.024Z"),
                    message: "Dolor incidunt odit."
                }
            ]
        }
    ] as UserPost[];
    const followers = [
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-2",
            "avatarUrl": "/static/mock-images/avatars/avatar_2.jpg",
            "name": "Earnest Howell",
            "country": "Cape Verde",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-3",
            "avatarUrl": "/static/mock-images/avatars/avatar_3.jpg",
            "name": "Willie Haag IV",
            "country": "New Caledonia",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-4",
            "avatarUrl": "/static/mock-images/avatars/avatar_4.jpg",
            "name": "Daniel Huel",
            "country": "Swaziland",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-5",
            "avatarUrl": "/static/mock-images/avatars/avatar_5.jpg",
            "name": "Laverne Krajcik",
            "country": "Germany",
            "isFollowed": false
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-6",
            "avatarUrl": "/static/mock-images/avatars/avatar_6.jpg",
            "name": "Wesley Zboncak",
            "country": "Botswana",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-7",
            "avatarUrl": "/static/mock-images/avatars/avatar_7.jpg",
            "name": "Ruth Hoeger V",
            "country": "Algeria",
            "isFollowed": false
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-8",
            "avatarUrl": "/static/mock-images/avatars/avatar_8.jpg",
            "name": "Emilio Mueller",
            "country": "Isle of Man",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-9",
            "avatarUrl": "/static/mock-images/avatars/avatar_9.jpg",
            "name": "Darrell Prosacco III",
            "country": "Guam",
            "isFollowed": false
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-10",
            "avatarUrl": "/static/mock-images/avatars/avatar_10.jpg",
            "name": "Melody Fahey IV",
            "country": "El Salvador",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-11",
            "avatarUrl": "/static/mock-images/avatars/avatar_11.jpg",
            "name": "Jason Bergstrom",
            "country": "Montserrat",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-12",
            "avatarUrl": "/static/mock-images/avatars/avatar_12.jpg",
            "name": "Dolores Borer",
            "country": "United States of America",
            "isFollowed": false
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-13",
            "avatarUrl": "/static/mock-images/avatars/avatar_13.jpg",
            "name": "Tricia Heidenreich",
            "country": "Antigua and Barbuda",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-14",
            "avatarUrl": "/static/mock-images/avatars/avatar_14.jpg",
            "name": "Dan Conn",
            "country": "Venezuela",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-15",
            "avatarUrl": "/static/mock-images/avatars/avatar_15.jpg",
            "name": "Bethany Stokes",
            "country": "Uganda",
            "isFollowed": false
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-16",
            "avatarUrl": "/static/mock-images/avatars/avatar_16.jpg",
            "name": "Julian Hagenes",
            "country": "Ireland",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-17",
            "avatarUrl": "/static/mock-images/avatars/avatar_17.jpg",
            "name": "Dustin Lang",
            "country": "Tonga",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-18",
            "avatarUrl": "/static/mock-images/avatars/avatar_18.jpg",
            "name": "Edmund Wunsch PhD",
            "country": "Equatorial Guinea",
            "isFollowed": true
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-19",
            "avatarUrl": "/static/mock-images/avatars/avatar_19.jpg",
            "name": "Bradford Franecki",
            "country": "Zimbabwe",
            "isFollowed": false
        }
    ];
    const friends = [
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-2",
            "avatarUrl": "/static/mock-images/avatars/avatar_2.jpg",
            "name": "Rebecca McDermott",
            "role": "Backend Developer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-3",
            "avatarUrl": "/static/mock-images/avatars/avatar_3.jpg",
            "name": "Cheryl Pfannerstill",
            "role": "UI Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-4",
            "avatarUrl": "/static/mock-images/avatars/avatar_4.jpg",
            "name": "Mrs. Julie Parker",
            "role": "Leader"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-5",
            "avatarUrl": "/static/mock-images/avatars/avatar_5.jpg",
            "name": "Hope Prosacco",
            "role": "Full Stack Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-6",
            "avatarUrl": "/static/mock-images/avatars/avatar_6.jpg",
            "name": "Mr. Derrick Heller",
            "role": "UI Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-7",
            "avatarUrl": "/static/mock-images/avatars/avatar_7.jpg",
            "name": "Yvette Tromp",
            "role": "Hr Manager"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-8",
            "avatarUrl": "/static/mock-images/avatars/avatar_8.jpg",
            "name": "Kristina Rempel PhD",
            "role": "Leader"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-9",
            "avatarUrl": "/static/mock-images/avatars/avatar_9.jpg",
            "name": "Randall Quitzon",
            "role": "Backend Developer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-10",
            "avatarUrl": "/static/mock-images/avatars/avatar_10.jpg",
            "name": "Fredrick Turcotte",
            "role": "Full Stack Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-11",
            "avatarUrl": "/static/mock-images/avatars/avatar_11.jpg",
            "name": "Kent Murray",
            "role": "Full Stack Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-12",
            "avatarUrl": "/static/mock-images/avatars/avatar_12.jpg",
            "name": "Fernando Haley",
            "role": "Full Stack Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-13",
            "avatarUrl": "/static/mock-images/avatars/avatar_13.jpg",
            "name": "Susie Heller III",
            "role": "UX Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-14",
            "avatarUrl": "/static/mock-images/avatars/avatar_14.jpg",
            "name": "Bobby Mertz V",
            "role": "UX Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-15",
            "avatarUrl": "/static/mock-images/avatars/avatar_15.jpg",
            "name": "Stuart Rowe",
            "role": "UI Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-16",
            "avatarUrl": "/static/mock-images/avatars/avatar_16.jpg",
            "name": "Regina Anderson",
            "role": "Full Stack Developer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-17",
            "avatarUrl": "/static/mock-images/avatars/avatar_17.jpg",
            "name": "Geraldine Bergstrom",
            "role": "Leader"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-18",
            "avatarUrl": "/static/mock-images/avatars/avatar_18.jpg",
            "name": "Sara Weimann",
            "role": "UI/UX Designer"
        },
        {
            "id": "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-19",
            "avatarUrl": "/static/mock-images/avatars/avatar_19.jpg",
            "name": "Allan Gleason",
            "role": "Full Stack Designer"
        }
    ];
    const gallery = [
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-2",
            title: "Dynamic Integration Facilitator",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_2.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-3",
            title: "Chief Quality Agent",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_3.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-4",
            title: "Senior Division Supervisor",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_4.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-5",
            title: "Investor Interactions Planner",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_5.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-6",
            title: "Internal Creative Planner",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_6.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-7",
            title: "Lead Interactions Administrator",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_7.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-8",
            title: "National Group Associate",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_8.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-9",
            title: "Chief Functionality Supervisor",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_9.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-10",
            title: "Customer Configuration Analyst",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_10.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-11",
            title: "Corporate Brand Designer",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_11.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-12",
            title: "Future Group Technician",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_12.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-13",
            title: "Regional Metrics Developer",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_13.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-14",
            title: "Global Identity Orchestrator",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_14.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-15",
            title: "Dynamic Operations Executive",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_15.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-16",
            title: "Forward Accounts Facilitator",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_16.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-17",
            title: "Future Accountability Executive",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_17.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-18",
            title: "Regional Functionality Supervisor",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_18.jpg"
        },
        {
            id: "fc68bad5-d430-4033-b8f8-4bc069dc0ba0-19",
            title: "District Quality Consultant",
            postAt: new Date("2022-11-05T14:48:43.024Z"),
            imageUrl: "/static/mock-images/covers/cover_19.jpg"
        }
    ];
    const handleChangeTab = (newValue: string) => {
        setCurrentTab(newValue);
    };

    const handleToggleFollow = (followerId: string) => {
        // dispatch(onToggleFollow(followerId));
    };

    const handleFindFriends = (value: string) => {
        setFindFriends(value);
    };

    if (!myProfile) {
        return null;
    }

    const PROFILE_TABS = [
        {
            value: 'profile',
            icon: <Icon icon={roundAccountBox} width={20} height={20} />,
            component: <Profile myProfile={myProfile} posts={posts} />
        },
        {
            value: 'edit',
            icon: <Icon icon={roundPermMedia} width={20} height={20} />,
            component: <UserCreate isEdit={true} />
        }
    ];
    const subdomain = useAppSelector(currentTenantSubdomainSelector);

    console.log(subdomain);

    return (
        <Container maxWidth={'lg'}>
            <Card
                sx={{
                    mb: 3,
                    height: 280,
                    position: 'relative'
                }}
            >
                <ProfileCover myProfile={myProfile} />

                <TabsWrapperStyle>
                    <Tabs
                        value={currentTab}
                        scrollButtons="auto"
                        variant="scrollable"
                        allowScrollButtonsMobile
                        onChange={(e, value) => handleChangeTab(value)}
                    >
                        {PROFILE_TABS.map((tab) => (
                            <Tab
                                disableRipple
                                key={tab.value}
                                value={tab.value}
                                icon={tab.icon}
                                label={capitalCase(tab.value)}
                            />
                        ))}
                    </Tabs>
                </TabsWrapperStyle>
            </Card>

            {PROFILE_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
        </Container>
    );
}
