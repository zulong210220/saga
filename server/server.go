package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/julienschmidt/httprouter"
)

type Blog struct {
	Id     int64  `json:"id"`
	Author string `json:"author"`
	Title  string `json:"title"`
	Body   string `json:"body"`
}

type Poetry struct {
	Id     int64    `json:"id"`
	Author string   `json:"author"`
	Title  string   `json:"title"`
	Body   []string `json:"body"`
}

var (
	poetrys = []Poetry{
		Poetry{

			Title: "将进酒",
			Body: []string{
				"君不见,黄河之水天上来,奔流到海不复回",
				"君不见,高堂明镜悲白发,朝如青丝暮成雪",
				"人生得意须尽欢,莫使金樽空对月",
				"天生我材必有用,千金散尽还复来",
				"烹羊宰牛且为乐,会须一饮三百杯",
				"岑夫子,丹丘生,将进酒,杯莫停",
				"与君歌一曲,请君为我倾耳听",
				"钟鼓馔玉不足贵,但愿长醉不复醒",
				"古来圣贤皆寂寞,惟有饮者留其名",
				"陈王昔时宴平乐,斗酒十千恣欢谑",

				"主人何为言少钱,径须沽取对君酌",

				"五花马,千金裘,呼儿将出换美酒,与尔同销万古愁",
			},
			Author: "李白",
			Id:     1,
		},
		Poetry{
			Title: "滕王阁序",
			Body: []string{
				"豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。",
				"时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿。临帝子之长洲，得仙人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，列冈峦之体势。",
				"披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰迷津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨，雁阵惊寒，声断衡阳之浦。",

				"遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人；萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？",

				"嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子安贫，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭!",

				"勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？",

				"呜乎！胜地不常，盛筵难再；兰亭已矣，梓泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔：",

				"滕王高阁临江渚，佩玉鸣鸾罢歌舞。",

				"画栋朝飞南浦云，珠帘暮卷西山雨。",

				"闲云潭影日悠悠，物换星移几度秋。",

				"阁中帝子今何在？槛外长江空自流。",
			},
			Author: "王勃",
			Id:     2,
		},
		Poetry{
			Title: "茅屋为秋风所破歌",
			Body: []string{

				"			八月秋高风怒号，卷我屋上三重茅",

				"茅飞渡江洒江郊，高者挂罥长林梢，下者飘转沉塘坳",

				"南村群童欺我老无力，忍能对面为盗贼，公然抱茅入竹去",

				"唇焦口燥呼不得，归来倚杖自叹息",

				"俄顷风定云墨色，秋天漠漠向昏黑",

				"布衾多年冷似铁，娇儿恶卧踏里裂。床头屋漏无干处，雨脚如麻未断绝",

				"自经丧乱少睡眠，长夜沾湿何由彻",

				"安得广厦千万间，大庇天下寒士俱欢颜，风雨不动安如山",

				"呜呼！何时眼前突兀见此屋，吾庐独破受冻死亦足",
			},
			Author: "杜甫",
			Id:     3,
		},
	}
)

/*
func Cors() gin.HandlerFunc {

	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		if origin != "" {
			c.Header("Access-Control-Allow-Origin", "*")
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization")
			c.Header("Access-Control-Allow-Credentials", "true")
			c.Set("content-type", "application/json")
		}
		//放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}
*/

func HelloHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Fprintf(w, "Hello World")
}

func BlogsHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Println("blogs enter", time.Now())
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("content-type", "application/json")
	jsonStr, err := json.Marshal(poetrys)
	if err != nil {
		fmt.Fprintln(w, "{}")
		return
	}
	fmt.Fprintln(w, string(jsonStr))
	//fmt.Println(string(jsonStr))
	fmt.Println("blogs leave", time.Now())
}

func BlogHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("content-type", "application/json")

	id := ps.ByName("id")
	fmt.Println("id:", id)
	idx, _ := strconv.ParseInt(id, 10, 64)
	index := 0
	if idx >= 1 {
		index = int(idx) - 1
	}
	jsonStr, err := json.Marshal(poetrys[index])
	if err != nil {
		fmt.Fprintln(w, "{}")
		return
	}
	fmt.Fprintln(w, string(jsonStr))
	fmt.Println(string(jsonStr))
}

func NewHandler(fn func(r *http.Request, ps httprouter.Params) interface{}) func(http.ResponseWriter, *http.Request, httprouter.Params) {
	f := func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("content-type", "application/json")

		resp := fn(r, ps)

		jsonStr, err := json.Marshal(resp)
		if err != nil {
			fmt.Fprintln(w, "{}")
			return
		}
		body := string(jsonStr)
		fmt.Fprintln(w, body)
	}
	return f
}

func aboutFn(r *http.Request, ps httprouter.Params) interface{} {
	type About struct {
		Data string `json:"data"`
	}

	body := `
<h1> hello </h1>

<h2> https://v2.mugua-sub.com/link/S7ErFya4ph1ZMtOB?clash=1&dns=0 </h2>

<h2> https://v2.mugua-sub.com/link/S7ErFya4ph1ZMtOB?clash=1</h2>

<h3>https://rss.mugua-sub2.xyz/link/S7ErFya4ph1ZMtOB?clash=1&dns=0</h3>`
	a := &About{
		Data: body,
	}
	return a
}

func AboutHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("content-type", "application/json")

	type About struct {
		Data string `json:"data"`
	}

	body := `
<h1> hello </h1>

<h2> https://v2.mugua-sub.com/link/S7ErFya4ph1ZMtOB?clash=1&dns=0 </h2>

<h2> https://v2.mugua-sub.com/link/S7ErFya4ph1ZMtOB?clash=1</h2>

<h3>https://rss.mugua-sub2.xyz/link/S7ErFya4ph1ZMtOB?clash=1&dns=0</h3>`
	a := &About{
		Data: body,
	}

	jsonStr, err := json.Marshal(a)
	if err != nil {
		fmt.Fprintln(w, "{}")
		return
	}
	body = string(jsonStr)
	fmt.Fprintln(w, body)
}

func main() {
	//http.HandleFunc("/", HelloHandler)
	//http.HandleFunc("/blogs", BlogsHandler)

	router := httprouter.New()
	router.GET("/", HelloHandler)
	router.GET("/about", NewHandler(aboutFn))
	router.GET("/blogs", BlogsHandler)
	router.GET("/blogs/:id", BlogHandler)
	router.GET("/posts", BlogsHandler)
	router.GET("/posts/:id", BlogHandler)

	log.Fatal(http.ListenAndServe(":8000", router))
}
