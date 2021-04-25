--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 13.2

-- Started on 2021-04-25 01:07:19 CDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3944 (class 1262 OID 16396)
-- Name: UHMusicDB; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "UHMusicDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE "UHMusicDB" OWNER TO postgres;

\connect "UHMusicDB"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3938 (class 0 OID 16690)
-- Dependencies: 217
-- Data for Name: albums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.albums (album_id, user_id, album_duration, release_date, artists, album_art, publisher, isrc, composer, release_title, buy_link, album_title, record_label, barcode, iswc, p_line, explicit_content, s3_album_image_key) FROM stdin;
2	18	\N	\N	\N	https://musicplayer-album-art.s3.us-east-2.amazonaws.com/89a05d6e-35c4-4377-b9be-adc7bc3bf2d5	\N	\N	\N	\N	\N	Album 2: Electric Boogallo	\N	\N	\N	\N	f	89a05d6e-35c4-4377-b9be-adc7bc3bf2d5
4	\N	\N	\N	metalica	\N	\N	\N	\N	\N	\N	Master	\N	\N	\N	\N	\N	\N
5	\N	20:19:00	2019-06-17	Drake	\N	WB	\N	Retro Records	short and sweet	\N	small alubm	\N	27854	\N	\N	t	\N
6	\N	14:19:00	2017-04-15	Post Malone	https://dummyimage.com/640x360/fff/aaa	WB	\N	\N	album3	\N	Bentleys	Track Records	2255	\N	\N	f	\N
7	\N	12:27:00	2015-09-12	Nick Cage	https://www.placecage.com/640/360	The Cage	\N	\N	Ghost Rider	\N	The Bees	Cage Records	289345	SOS	Bees	f	\N
8	\N	09:20:00	2012-07-17	The Bear	https://placebear.com/640/360	Bear INC.	\N	\N	Honey and Berries	\N	Grizzly	We are Bears	74312	SS	cub	t	\N
9	\N	05:20:00	1997-03-03	Steven Segall	https://www.stevensegallery.com/640/360	Segall Records	DSS	Steven Segall	I Am Segall	\N	Segall	Segall and Sons	95621	SSD	blade	t	\N
10	\N	03:11:00	2002-05-19	Andros	https://picsum.photos/640/360	WB	MMO	Andy Smith	The Bridge	\N	The Bridge	World Records	162890	OSM	PBridge	f	\N
11	\N	07:14:00	2005-08-23	The Kittens	https://placekitten.com/640/360	WB	MMC	Catwoman	The Cats	\N	Cats	World Records	14723	NYY	PCats	f	\N
12	\N	10:07:00	2009-10-29	Bill Murray	https://www.fillmurray.com/640/360	WB	MMD	Bill Murray	The Murray	\N	The Murray	Running Records	223415	ABC	PMurray	f	\N
13	\N	13:19:00	2017-11-03	The Beard	https://placebeard.it/640x360	WB	MMA	The Beard	Beard	\N	Beard	Big Beard Records	451132	BMW	PBeard	t	\N
1	18	\N	\N	\N	https://musicplayer-album-art.s3.us-east-2.amazonaws.com/a5f41db5-b31b-40aa-b801-3113ec7e9a80	\N	\N	\N	\N	\N	Album 1	\N	\N	\N	\N	f	a5f41db5-b31b-40aa-b801-3113ec7e9a80
3	18	\N	\N	\N	https://musicplayer-album-art.s3.us-east-2.amazonaws.com/a00f9607-d067-469a-9ce1-76a1abe9cdcb	\N	\N	\N	\N	\N	Album 3: Finale	\N	\N	\N	\N	f	a00f9607-d067-469a-9ce1-76a1abe9cdcb
14	21	\N	\N	\N	https://musicplayer-album-art.s3.us-east-2.amazonaws.com/8e63afb2-56d5-416b-b45d-9c8635f07ac8	\N	\N	\N	\N	\N	Redd	\N	\N	\N	\N	f	8e63afb2-56d5-416b-b45d-9c8635f07ac8
16	27	\N	\N	\N	https://musicplayer-album-art.s3.us-east-2.amazonaws.com/c8845a9c-bd43-4071-a9ec-a00712186a8f	\N	\N	\N	\N	\N	Album!!!	\N	\N	\N	\N	f	c8845a9c-bd43-4071-a9ec-a00712186a8f
\.


--
-- TOC entry 3936 (class 0 OID 16646)
-- Dependencies: 215
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.follows (fid, user_id, follower_id) FROM stdin;
15	19	20
17	10	20
21	18	20
22	10	23
25	21	26
26	26	27
27	27	21
\.


--
-- TOC entry 3932 (class 0 OID 16581)
-- Dependencies: 211
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (nid, receiver_id, sender_id, album_id, song_id, notif_type, notif_text, created_at, read) FROM stdin;
24	18	20	\N	\N	UNFOLLOWED	Someone unfollowed You!	2021-04-19 04:36:56.146152+00	f
25	18	20	\N	\N	NEWFOLLOWER	A new user has followed you!	2021-04-19 04:37:01.256875+00	f
26	18	20	\N	\N	UNFOLLOWED	Someone unfollowed You!	2021-04-19 04:37:09.155419+00	f
27	18	20	\N	\N	NEWFOLLOWER	A new user has followed you!	2021-04-19 04:37:19.629204+00	f
28	20	18	2	\N	NEWALBUM	A musician you follow has released a new album!	2021-04-19 04:38:29.510638+00	f
29	20	18	3	\N	NEWALBUM	A musician you follow has released a new album!	2021-04-19 04:38:35.261371+00	f
30	18	23	\N	\N	NEWFOLLOWER	A new user has followed you!	2021-04-21 22:43:32.77122+00	f
31	18	23	\N	\N	UNFOLLOWED	Someone unfollowed You!	2021-04-21 22:44:27.193478+00	f
32	21	26	\N	\N	NEWFOLLOWER	A new user has followed you!	2021-04-25 03:46:06.41094+00	f
33	26	27	\N	\N	NEWFOLLOWER	A new user has followed you!	2021-04-25 03:50:38.811631+00	f
34	27	21	\N	\N	NEWFOLLOWER	A new user has followed you!	2021-04-25 03:52:18.071783+00	f
35	21	27	16	\N	NEWALBUM	A musician you follow has released a new album!	2021-04-25 03:54:07.918483+00	f
\.


--
-- TOC entry 3930 (class 0 OID 16552)
-- Dependencies: 209
-- Data for Name: playlist_songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlist_songs (id, playlist_id, song_id) FROM stdin;
9	24	56
10	20	52
\.


--
-- TOC entry 3928 (class 0 OID 16535)
-- Dependencies: 207
-- Data for Name: playlists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlists (playlist_id, user_id, playlist_name, public_status, description, playlist_art, s3_playlist_image_key) FROM stdin;
4	3	Pop songs	t	\N	<insert image link here>	\N
1	1	Favorite songs	f	\N	<insert image link here>	\N
2	1	Least-favorite songs	f	\N	<insert image link here>	\N
6	4	New PLaylist	t	\N	https://musicplayer-playlistart.s3.us-east-2.amazonaws.com/ee14238f-1d9c-491d-a45a-9c933bfeddb7	ee14238f-1d9c-491d-a45a-9c933bfeddb7
9	19	Pink Sweats	t	\N	https://musicplayer-playlistart.s3.us-east-2.amazonaws.com/d2b2a4d9-84b0-4174-96e4-25a2a2c580ea	d2b2a4d9-84b0-4174-96e4-25a2a2c580ea
14	4	Hits	t	\N	https://musicplayer-playlistart.s3.us-east-2.amazonaws.com/01807965-8da8-4538-bebc-511dcd607c88	01807965-8da8-4538-bebc-511dcd607c88
15	4	My Bops	t	\N	https://musicplayer-playlistart.s3.us-east-2.amazonaws.com/d7778b3b-0738-4c23-8ea1-b64fe4d738d2	d7778b3b-0738-4c23-8ea1-b64fe4d738d2
16	4	New Stuff	t	hello it's my stuff	<insert image link here>	\N
17	5	Playlist 1	t	\N	<insert image link here>	\N
20	21	Awesome UH	t	\N	https://musicplayer-playlistart.s3.us-east-2.amazonaws.com/d437325b-6636-41dd-bc69-75dc6858fad2	d437325b-6636-41dd-bc69-75dc6858fad2
21	21	Awesome UH	t	\N	https://musicplayer-playlistart.s3.us-east-2.amazonaws.com/b474ebab-ed47-4772-8c53-8797353fcc3f	b474ebab-ed47-4772-8c53-8797353fcc3f
24	23	Test	t	test	https://musicplayer-playlistart.s3.us-east-2.amazonaws.com/96451d78-be27-4aa9-9f78-ccde7b9b6f14	96451d78-be27-4aa9-9f78-ccde7b9b6f14
25	23	Test	t	test	https://musicplayer-playlistart.s3.us-east-2.amazonaws.com/f18753b3-a5e6-4ff2-83b1-3d1ded862643	f18753b3-a5e6-4ff2-83b1-3d1ded862643
\.


--
-- TOC entry 3934 (class 0 OID 16612)
-- Dependencies: 213
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings (sid, user_id, new_album_notification, new_single_release_notification, new_follower_notification, new_like_notification, new_comment_notification, suggested_content, new_message, receive_messages_from_everybody, analytics, personal_advertisment) FROM stdin;
1	13	f	f	f	f	f	f	f	f	t	t
2	14	f	f	f	f	f	f	f	f	t	t
3	15	f	f	f	f	f	f	f	f	t	t
4	16	f	f	f	f	f	f	f	f	t	t
5	17	f	f	f	f	f	f	f	f	t	t
6	18	t	t	t	t	t	t	t	t	t	t
7	19	t	t	t	t	t	t	t	t	t	t
8	20	t	t	t	t	t	t	t	t	t	t
9	21	t	t	t	t	t	t	t	t	t	t
10	22	t	t	t	t	t	t	t	t	t	t
11	23	t	t	t	t	t	t	t	t	t	t
12	24	t	t	t	t	t	t	t	t	t	t
13	25	t	t	t	t	t	t	t	t	t	t
14	26	t	t	t	t	t	t	t	t	t	t
15	27	t	t	t	t	t	t	t	t	t	t
\.


--
-- TOC entry 3926 (class 0 OID 16511)
-- Dependencies: 205
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs (song_id, title, genre, additional_tag, song_link, description, caption, ft_musicians, user_id, album_id, release_date, song_image, num_played, publisher, isrc, composer, release_title, buy_link, album_title, record_label, barcode, iswc, p_line, explicit_content, s3_image_key, s3_audio_key, duration) FROM stdin;
50	Rather It Be September	None	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/ec54b12d-0c32-4f78-a6f1-017c0bed1e17	Mashup of Rather Be - Clean Bandit and September - Earth, Wind and Water	\N	{}	21	\N	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/34e0404c-02ad-4549-bd25-68cdca1d0164	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	34e0404c-02ad-4549-bd25-68cdca1d0164	ec54b12d-0c32-4f78-a6f1-017c0bed1e17	191
53	watercolor by Wheein	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/e15c15fb-05d9-4080-8378-aebea67b55f7	\N	\N	{}	21	14	\N	\N	0	\N	\N	\N	\N	\N	Redd	\N	\N	\N	\N	f	\N	e15c15fb-05d9-4080-8378-aebea67b55f7	189
52	EASY by Wheein	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/cbacab0b-cba9-4c79-950d-9d0b7d39ac34	\N	\N	{}	21	14	\N	https://musicplayer-album-art.s3.us-east-2.amazonaws.com/8e63afb2-56d5-416b-b45d-9c8635f07ac8	0	\N	\N	\N	\N	\N	Redd	\N	\N	\N	\N	f	\N	cbacab0b-cba9-4c79-950d-9d0b7d39ac34	189
56	OOOOWEEE .mp3	Country	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/03fb7578-82c5-4085-b230-3b0511f305ed	\N	\N	{}	23	\N	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/e9fbe95c-36ec-4446-ac7e-a603b5d3c4cd	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	e9fbe95c-36ec-4446-ac7e-a603b5d3c4cd	03fb7578-82c5-4085-b230-3b0511f305ed	2
58	but you didnt.mp3	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/16845927-cb63-43de-9b30-c4c358b312a5	\N	\N	{}	27	16	\N	\N	0	\N	\N	\N	\N	\N	Album!!!	\N	\N	\N	\N	f	\N	16845927-cb63-43de-9b30-c4c358b312a5	7
59	EASY (Feat. Sik-K(식케이)).mp3	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/90275dfe-7362-4ec1-b705-bcb71319a8da	\N	\N	{}	27	16	\N	\N	0	\N	\N	\N	\N	\N	Album!!!	\N	\N	\N	\N	f	\N	90275dfe-7362-4ec1-b705-bcb71319a8da	7
51	But You Didn't	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/da88c338-a26a-4beb-b0b9-0d7c61fc406c	\N	\N	{}	21	\N	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/e1986cee-642b-4c5f-a30c-3b1641a30022	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	e1986cee-642b-4c5f-a30c-3b1641a30022	da88c338-a26a-4beb-b0b9-0d7c61fc406c	7
57	Kanye West Hurricane Full Version.mp3	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/01bf79a0-eb7c-4a03-9357-ccc9518bad69	\N	\N	{}	18	\N	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/a0fbc9c2-994f-4740-bce8-1129bbf580db	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	a0fbc9c2-994f-4740-bce8-1129bbf580db	01bf79a0-eb7c-4a03-9357-ccc9518bad69	554
38	At My Worst (Lyrics).mp3	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/b3a55b8d-bd99-4127-89da-130dd59989c0	\N	\N	{}	19	11	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/e12a8ee4-9dcd-40c9-90b8-7e286ea192ae	0	\N	\N	\N	\N	\N	Album1	\N	\N	\N	\N	f	\N	b3a55b8d-bd99-4127-89da-130dd59989c0	2
28	LISA Soundtrack - Work Harder	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/919294b4-41e3-4998-b924-e3f12118c116	\N	\N	{}	12	\N	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/e12a8ee4-9dcd-40c9-90b8-7e286ea192ae	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	1a9f0d33-38bb-4fcd-9805-19802de7e125	919294b4-41e3-4998-b924-e3f12118c116	106
45	Pink Sweat$ - At My Worst (Lyrics).mp3	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/9040b118-b53d-4940-8124-bd8e76dd14d6	\N	\N	{}	18	3	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/04c6d6c5-b545-45fc-b234-3afaa6e3afa7	0	\N	\N	\N	\N	\N	Album1	\N	\N	\N	\N	f	\N	9040b118-b53d-4940-8124-bd8e76dd14d6	2
33	Pink Sweat$ - At My Worst (Lyrics).mp3	\N	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/fb3fe989-b85f-491c-bc1a-4b74e0cc9502	\N	\N	{}	14	\N	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/04c6d6c5-b545-45fc-b234-3afaa6e3afa7	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	e12a8ee4-9dcd-40c9-90b8-7e286ea192ae	fb3fe989-b85f-491c-bc1a-4b74e0cc9502	554
25	Ritt Momney - Put Your Records On.mp3	Pop	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/819d58e6-97d5-4b74-9caa-435b123cfa75	Hi	Hi	{}	5	\N	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/bf2091b9-dc0c-4c8d-9d89-33554ae6ec14	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	706701c8-026c-4355-bb04-7a8d1a32fa9b	819d58e6-97d5-4b74-9caa-435b123cfa75	147
27	The Weeknd - Save Your Tears.mp3	Pop	{}	https://musicplayer-song.s3.us-east-2.amazonaws.com/3a18b2ff-5caa-4505-a3dd-c2d773d761d2	Song	Song	{}	5	\N	\N	https://musicplayer-songart.s3.us-east-2.amazonaws.com/ca3ba238-3aca-44df-b6d4-ca60af5e68f4	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	07c916ce-37a1-4fc7-bada-8e17c840f1e5	3a18b2ff-5caa-4505-a3dd-c2d773d761d2	216
\.


--
-- TOC entry 3924 (class 0 OID 16432)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uid, username, first_name, last_name, email, email_verified, googleid, password, avatar, background_img_url, city, country, created_at, updated_at, about_me, links, socialmedia_fb, socialmedia_tw, socialmedia_in, musician, record_label, num_listeners, is_admin) FROM stdin;
14	RealName	\N	\N	realemail@yahoogle.com	f	\N	$2a$10$ehQB9wl0xu3fDmpyfIITpeT30HNLPYquNrPjJDdz6vSroloLJGRb6	\N	\N	\N	\N	2021-04-18 22:36:52.48235+00	2021-04-18 22:36:52.48235+00	\N	{}	\N	\N	\N	\N	\N	0	f
15	qweasdzxc	\N	\N	nachodog@gmail.com	f	\N	$2a$10$VkSPcy2C2EmMzUuMtvyHK.RyL99IZgqsVTseKeQSTmvXY0Zc5X4sq	\N	\N	\N	\N	2021-04-18 22:55:18.397277+00	2021-04-18 22:55:18.397277+00	\N	{}	\N	\N	\N	\N	\N	0	f
17	Namename	\N	\N	ReallyRealEmail@gaggle.com	f	\N	$2a$10$5fNeS08BI4Nyr3.9Y68uDOheORbiVPr0q3UP.jWAfVoTmrOTYR0y.	\N	\N	\N	\N	2021-04-18 23:11:12.671705+00	2021-04-18 23:11:12.671705+00	\N	{}	\N	\N	\N	\N	\N	0	f
12	Bubblius Elliot	Alvin	Stilley	alvinstilley223@gmail.com	t	108891482160360349403	$2a$10$tGFQTwm5/GaUjQLOLizvTeKJe9RF7tlXBkwAzo5Z5c8qfwjqEe0cy	https://lh3.googleusercontent.com/a-/AOh14GhVIAuHLpofSYWrh9VVGvLA-0BgD5ckKIAau9EA1g=s96-c	\N	\N	\N	2021-04-16 21:50:43.178347+00	2021-04-16 21:50:43.178347+00	\N	{}	\N	\N	\N	f	\N	0	f
19	Dummmmmm	\N	\N	Dummy@dummies.com	f	\N	$2a$10$juIeYu86ufWzEchaIA5/8uKCevTEjy5SrHDzUoBsJn4FLCPkaAVJi	\N	\N	\N	\N	2021-04-18 23:42:57.077775+00	2021-04-18 23:42:57.077775+00	\N	{}	\N	\N	\N	\N	\N	0	f
6	robertgreen	Robert	Green	\N	f	\N	\N	\N	\N	\N	\N	2021-04-16 03:45:24.427128+00	2021-04-16 03:45:24.427128+00	\N	{}	\N	https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw	\N	t	\N	0	f
7	theweeknd	Abel	Tesfaye	\N	f	\N	\N	\N	\N	\N	\N	2021-04-16 05:04:07.830558+00	2021-04-16 05:04:07.830558+00	\N	{}	\N	https://twitter.com/theweeknd	\N	t	\N	0	f
8	jsmith	John	Smith	\N	f	\N	\N	\N	\N	\N	\N	2021-04-16 05:05:01.366219+00	2021-04-16 05:05:01.366219+00	\N	{}	\N	https://twitter.com/rickastley	\N	f	\N	0	f
9	johns	John	Smith	\N	f	\N	\N	\N	\N	\N	\N	2021-04-16 05:06:15.233436+00	2021-04-16 05:06:15.233436+00	\N	{}	\N	https://twitter.com/KingJames	\N	f	\N	0	f
10	jjohnson	John	Johnson	\N	f	\N	\N	\N	\N	\N	\N	2021-04-16 05:09:26.695942+00	2021-04-16 05:09:26.695942+00	\N	{}	\N	https://twitter.com/NBA	\N	f	\N	0	f
11	gsmith	George	Smith	\N	f	\N	\N	\N	\N	\N	\N	2021-04-16 05:10:07.130872+00	2021-04-16 05:10:07.130872+00	\N	{}	\N	https://twitter.com/NFL	\N	f	\N	0	f
20	test	\N	\N	test@gmail.com	f	\N	$2a$10$jFR363X3m6yIFwx7YAPlCOoOXhORX58LenwALuPWNlJ4Krg3LqVwa	\N	\N	\N	\N	2021-04-19 01:24:10.069606+00	2021-04-19 01:24:10.069606+00	\N	{}	\N	\N	\N	\N	\N	0	f
1	tester1	\N	\N	tester1@gmail.com	f	\N	\N	\N	\N	\N	\N	2021-04-06 19:39:06.607171+00	2021-04-06 19:39:06.607171+00	\N	{}	\N	\N	\N	f	\N	0	f
4	Edward Vo	Edward	Vo	edwardvo2000@gmail.com	t	106442767456101102677	\N	https://lh3.googleusercontent.com/a-/AOh14GitGRhzpe90MkrTnG36fdJ2lFa72r0XPEtEmLYntg=s96-c	\N	\N	\N	2021-04-07 22:41:08.847047+00	2021-04-07 22:41:08.847047+00	\N	{}	\N	\N	\N	t	\N	0	t
21	Edward Vo	Edward	Vo	edwardthanhvo@gmail.com	t	113884532880668602019	\N	https://lh3.googleusercontent.com/a-/AOh14Giz1kN5gOpNDjmjZJgSRuoWqfAyH7AO1u8U0361=s96-c	\N	\N	\N	2021-04-19 05:19:20.311307+00	2021-04-19 05:19:20.311307+00	\N	{}	\N	\N	\N	\N	\N	0	t
13	bademail	\N	\N	bademail@gmail.com	f	\N	$2a$10$XIvDnYFQL142pbp.uoFh7OrIL32ydNbDV.sH.laL95cUErxE0pVDq	\N	\N	\N	\N	2021-04-18 22:31:37.726167+00	2021-04-18 22:31:37.726167+00	\N	{}	\N	\N	\N	\N	\N	0	f
5	Robert Green	Robert	Green	robertgreen500@gmail.com	t	115236932895467284545	$2a$10$uo7V6OsssVRm0oGzY5FQluybD8YZXLKJzrD6KunRFwz9z.x3nj6DW	https://lh3.googleusercontent.com/a-/AOh14GgRO7yDoIlhmfyE6iTT23ZaJ4LckQGzn7d7DyJKVtA=s96-c	\N	\N	\N	2021-04-08 03:50:29.527355+00	2021-04-08 03:50:29.527355+00	Hello	{}	\N	\N	\N	t	\N	0	f
22	randalliscool	Randall	Park	randallpark@hotmail.com	f	\N	$2a$10$Tb8pYA8/jZUhvzWRvtkTG.TbwgIOtVLizWrDh0Gl3coUevvV1kIw.	\N	\N	\N	\N	2021-04-19 05:20:09.069767+00	2021-04-19 05:20:09.069767+00	\N	{}	\N	\N	\N	\N	\N	0	f
3	Andreas Kalos	Andreas	Kalos	infernoxl98@gmail.com	t	101195126420643688849	$2a$10$6Ooq9xA6vfI.X.iv3zF26uJAGMGJcWv4.37v9dqOMQ4QmSMBz9AtW	https://lh3.googleusercontent.com/a-/AOh14GjFnl-MKj7Zn4S2dXeS9ALPFTz83VNNGqBsdonX=s96-c	\N	\N	\N	2021-04-07 22:36:32.346217+00	2021-04-07 22:36:32.346217+00	\N	{}	\N	\N	\N	t	\N	0	t
16	newusername	Edward	\N	newaccount@gmail.com	f	\N	$2a$10$sZfcgl1LuBc2wRGj6sESzO3BpEV9Jq3npg4I4HYwFj/rczT8gtFnO	\N	\N	\N	\N	2021-04-18 23:07:49.015812+00	2021-04-18 23:07:49.015812+00	\N	{}	\N	\N	\N	\N	\N	0	f
18	Tony Tran	Edward	Tran	johnsontothetran1@gmail.com	t	118126790592077985242	$2a$10$GnIg4.TP1MM8dA/l8PwO8etPi5CurQHkW/pcXRrN/5M0quV1YOc3q	https://lh3.googleusercontent.com/a-/AOh14Gi69uY-6QLpEvC2cpRzaIBudurz_tyGu_v6ImatQA=s96-c	\N	\N	\N	2021-04-18 23:29:09.079756+00	2021-04-18 23:29:09.079756+00	dfdf	{}	\N	\N	\N	\N	\N	0	t
23	DummyUser	\N	\N	dummyEmail@emails.com	f	\N	$2a$10$hhGztMd56SH4S195Ea2sRuviZgxSdqkfSUMmDBRk2p30SWb7MIDYK	\N	\N	\N	\N	2021-04-21 22:34:50.516597+00	2021-04-21 22:34:50.516597+00	\N	{}	\N	\N	\N	\N	\N	0	f
24	bruh	\N	\N	123@gmail.com	f	\N	$2a$10$ZVytcmRCcFwSfEDJ27aXsuPqaeX6JDsXXJlAKzA57u7AZBM/yvAcW	\N	\N	\N	\N	2021-04-21 22:36:22.78436+00	2021-04-21 22:36:22.78436+00	\N	{}	\N	\N	\N	\N	\N	0	f
25	tempuser	sadfsdf	\N	b@gmail.com	f	\N	$2a$10$u2o0Fy378YXGXdf9BlY9SO7RAvx9A96dR4WYi1ygmYPiupqsBk8by	\N	\N	\N	\N	2021-04-21 22:54:39.166639+00	2021-04-21 22:54:39.166639+00	\N	{}	\N	\N	\N	\N	\N	0	f
26	iamedward	\N	\N	iamedward@gmail.com	f	\N	$2a$10$7xqW/SRphK6gGx.qStyZS.il5sryIFxN8cwFVpblDBZaU4mibT8ke	\N	\N	\N	\N	2021-04-25 03:45:56.9807+00	2021-04-25 03:45:56.9807+00	\N	{}	\N	\N	\N	\N	\N	0	f
27	dummyhaha	\N	\N	dummyhaha@gmail.com	f	\N	$2a$10$9xJjcAWxcd9leQ9x8tCA3OI3ZTy1zVJBbnMHaXrpARhszlOx81pwe	\N	\N	\N	\N	2021-04-25 03:49:34.296139+00	2021-04-25 03:49:34.296139+00	\N	{}	\N	\N	\N	\N	\N	0	f
\.


--
-- TOC entry 3954 (class 0 OID 0)
-- Dependencies: 216
-- Name: albums_album_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.albums_album_id_seq', 16, true);


--
-- TOC entry 3955 (class 0 OID 0)
-- Dependencies: 214
-- Name: follows_fid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.follows_fid_seq', 27, true);


--
-- TOC entry 3956 (class 0 OID 0)
-- Dependencies: 210
-- Name: notifications_nid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_nid_seq', 35, true);


--
-- TOC entry 3957 (class 0 OID 0)
-- Dependencies: 208
-- Name: playlist_songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.playlist_songs_id_seq', 10, true);


--
-- TOC entry 3958 (class 0 OID 0)
-- Dependencies: 206
-- Name: playlists_playlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.playlists_playlist_id_seq', 25, true);


--
-- TOC entry 3959 (class 0 OID 0)
-- Dependencies: 212
-- Name: settings_sid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.settings_sid_seq', 15, true);


--
-- TOC entry 3960 (class 0 OID 0)
-- Dependencies: 204
-- Name: songs_song_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.songs_song_id_seq', 59, true);


--
-- TOC entry 3961 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_uid_seq', 27, true);


-- Completed on 2021-04-25 01:07:27 CDT

--
-- PostgreSQL database dump complete
--

