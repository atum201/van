"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var voteConst = exports.voteConst = {
	emprires: ["sang", "assyrian", "egyptian", "hittle", "phoenician", "palmyran", "sumerian", "babylonian", "yamoto", "roman", "persian", "macedonian", "minoan", "carthagian", "choson", "greek"],
	empriresShort: ["sang", "asy", "egy", "hit", "pho", "pal", "sum", "baby", "ya", "rom", "per", "mac", "min", "cat", "cho", "gre"],
	noidung: ["ramdom", "asy", "sangtudo", "rsang", "honmasang", "yaasy", "ya4"],
	thethuc: ["solo", "22", "33", "44", "doanthe"],
	tinhchat: ["giaoluunoibo", "giaoluu", "giaoluuquocte", "giaidaunoibo", "giaidau", "giaidauquocte"],
	vaitro: ["ongbau", "gamethu", "mod", "chimlontamhuyet", "fan", "nhataitro"] };
var player = exports.player = {
	avatar: ['https://chat-portal.vnptsoftware.vn/img/2/chimsedinang.png', 'https://chat-portal.vnptsoftware.vn/img/2/bibi.png', 'https://chat-portal.vnptsoftware.vn/img/2/vanlove.png', 'http://chat-portal.vnptsoftware.vn/img/2/no1.png', 'https://chat-portal.vnptsoftware.vn/img/2/honganh.png'],
	nickName: ['ChimSeDiNang', 'BiBi', 'HongAnh', 'Gunny', 'VanLove', 'HungNhon', "HMN", 'ChipBoy', 'No1', 'U98'],
	clan: ['Ha Noi', 'GameTV', 'Skyred', 'BiBi Club', 'Thai Binh', 'Ha Nam', 'Sai Gon'],
	status: ['Top 1 Cung R', 'Sieu Chem', 'Maxping', 'Doc Co Cau Bai', 'Can Ban Do', 'Sieu Ba', 'Top 1 Solo']
};
var el = 16,
    pl = 10;
var re = function re() {
	var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : el;
	return parseInt(Math.random() * r);
};
var cgame = function cgame() {
	var emprire = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [re, re];
	var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : re(2);
	var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date().getTime();

	return { emprire: emprire, vote: [], blame: [], win: win, video: "", time: time };
},
    cturn = function cturn() {
	var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
	var bo = arguments[1];
	var player = arguments[2];

	var turn = [],
	    scored = [0, 0];
	while (scored[0] < bo && scored[1] < bo) {
		var _emprire = Array.apply(null, { length: type }).map(Function.call, Math.random).map(function (i) {
			return parseInt(i * el);
		}),
		    game = cgame(_emprire);
		turn.push(game);
		scored[game.win]++;
	}
	return { turn: turn, scored: scored, bo: bo, player: player };
},
    cmatch = function cmatch() {
	var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : re(1000);
	var bo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
	var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	var c = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : re(7);

	var player = Array.apply(null, { length: type * 2 }).map(Function.call, Math.random).map(function (i) {
		return parseInt(i * pl);
	}),
	    i = 0,
	    turn = [],
	    scored = [0, 0],
	    analyst = [],
	    team = [];
	while (i < c) {
		var t = cturn(type * 2, bo, player),
		    s = t.scored[0] === bo - 1 ? 0 : 1;
		scored[s]++;
		turn.push(t);
		console.log(t, 'scored:', scored);
		i++;
	}
	return { id: id, type: type, player: player, team: team, bo: bo, turn: turn, scored: scored, analyst: analyst };
};
var l = cmatch();
var emprire = exports.emprire = [];
var members = exports.members = [{
	id: 1,
	avatar: 'https://chat-portal.vnptsoftware.vn/img/2/chimsedinang.png',
	nickName: 'ChimSeDiNang',
	status: 'Vo doi'
}, {
	id: 2,
	avatar: 'https://chat-portal.vnptsoftware.vn/img/2/bibi.png',
	nickName: 'BiBi',
	status: 'BiBi Club'
}, {
	id: 3,
	avatar: 'https://chat-portal.vnptsoftware.vn/img/2/vanlove.png',
	nickName: 'VanLove',
	status: 'Van Giao dau'
}, {
	id: 4,
	avatar: 'http://chat-portal.vnptsoftware.vn/img/2/no1.png',
	nickName: 'No1',
	status: 'Đội trưởng GAMETV'
}, {
	id: 5,
	avatar: 'https://chat-portal.vnptsoftware.vn/img/2/honganh.png',
	nickName: 'honganh',
	status: ''
}],
    match = exports.match = {
	id: 1,
	type: '',
	player: [1, 2],
	team: [],
	bo: 3,
	turn: [{
		game: [{
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}],
		player: [1, 2],
		bo: 3,
		scored: [3, 0]
	}, {
		game: [{
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 2,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 2,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 2,
			video: "",
			time: new Date().getTime()
		}],
		player: [1, 2],
		bo: 3,
		win: 2,
		scored: [0, 3]
	}, {
		game: [{
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}],
		player: [1, 2],
		bo: 3,
		scored: [3, 0]
	}, {
		game: [{
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}],
		player: [1, 2],
		bo: 3,
		scored: [3, 0]
	}, {
		game: [{
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}, {
			emprire: [3, 8],
			vote: [],
			blame: [],
			win: 1,
			video: "",
			time: new Date().getTime()
		}],
		player: [1, 2],
		bo: 3,
		scored: [3, 0]
	}],
	scored: [4, 1],
	analyst: []
};
//# sourceMappingURL=test.js.map
