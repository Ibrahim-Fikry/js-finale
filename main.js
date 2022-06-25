// for jq intellissense
/// <reference path="./typings/globals/jquery/index.d.ts" />


$(document).ready(function() {



    //#region -----------------------fixed
    //---------------------- loading screen
    $('.loading').slideUp(500, function() {
        // switchClass  from jq ui
        $('.loading').switchClass('d-flex', 'd-none', function() {

            $('body').removeClass('overflow-hidden')
        })
    })


    // ---------  hide & show side   and nave btn
    //hide  side
    $('.hiddenside').hide()
        // hide all nave button
    $('.nav-item li').hide()
    $('.btnside').click(function() {
            //hide & show side
            $('.btnside').toggleClass('fa-times', 200, )

            $('.hiddenside').toggle(200, function() {
                //show hide nav btn
                $('.nav-item li').toggle(500, function() {
                    // reset navbtn colore to default
                    $('.nav-item li a,i').css('color', '')
                })
            })
        })
        //#region  -------------  navebar

    // 1---- smooth scroll page when click btns
    // bad 1  cant get offset
    // $('.Contactbtn').click(function() {
    //         let selectedhref = $(this).attr('href')
    //         let selectedhrefoffset = $(selectedhref).offset().top
    //         $('body,html').animate({
    //             scrollTop: selectedlioffset
    //         }, 1200)
    //     })


    // 3-tacke different action with each button 
    $('.item0').click(function() {

        general(ApinowplayingUrl)
    })
    $('.item1').click(function() {

        general(ApipopularmoviesUrl)
    })
    $('.item2').click(function() {

        general(ApitopRatedmoviesUrl)
    })
    $('.item3').click(function() {

        general(ApiTrendingmoviesUrl)
    })
    $('.item4').click(function() {

        general(ApibestdramasUrl)
    })

    // 4 -change style duting click with al li

    $('.nav-item li a,i').click(900, function() {
        // handel focuson clicked color 

        $('.nav-item li a,i').css('color', '')
        $(this).css({
            'color': ' #f25454',
            'transition': 'all 1s'
        })
    })

    //#endregion

    //#endregion

    //#region -----------------------------getapi

    const ApiKey = '&api_key=a5208e5b49c6070ccb08e9c12afd5949'
    let BaseUrl = 'https://api.themoviedb.org/3'
        // nowplaying
    let ApinowplayingUrl = `/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22${ApiKey}`
        // popularmovies?
    let ApipopularmoviesUrl = `/discover/movie?sort_by=popularity.desc${ApiKey}`
        // topRatedmovies?
    let ApitopRatedmoviesUrl = `/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc${ApiKey}`
        // Trendingmovies?
    let ApiTrendingmoviesUrl = `/discover/movie?primary_release_year=2010&sort_by=vote_average.desc${ApiKey}`


    //  best dramasmovies?
    let ApibestdramasUrl = `/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10${ApiKey}`




    let data = []

    async function getApi(ApiUrl = ApinowplayingUrl) {

        let apiResponse = await fetch(`${BaseUrl}${ApiUrl}`);
        let apiData = await apiResponse.json();
        data = apiData.results
        console.log(data)
        displayApi(data)
            // displayCurrent(finalResponse.location, finalResponse.current, finalResponse.forecast.forecastday[0]);
            // otherDay.innerHTML = "";
            // displayAnother(finalResponse.forecast.forecastday, finalResponse.location);

    };

    //#endregion

    //#region -----------------------------display api
    function displayApi(data) {
        let divs = ""

        for (let i = 0; i < data.length; i++) {
            divs += `
    


        <div class="col-md-4 p-0 ">
        <div class="p-4 ">
          <div class="bg-info text-center cardmovie position-relative ">
              <img src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}" class="w-100 " alt=" ">
              <div class=" w-100 h-100 position-absolute top-0 start-0 fixedmovie ">
              <h4>${data[i].overview}</h4></div>
          </div>
        </div>
      </div>
            `

        }

        $('.displaymovies').html(divs)

    }


    // handel async await    general function
    async function general(x) {
        await getApi(x)
        $('.fixedmovie').hide()
    }

    general()
        //#endregion

    //#region -----------------------------search
    let textsearch = $('.GetMoviesByWords')
    $('.GetMoviesByWords').keyup(function() {
        let textsearchval = textsearch.val()
        search(textsearchval)
    })

    function search(searchword) {
        // searchmovies?
        let ApisearchmoviesUrl = `/search/movie?${ApiKey}&query=${searchword}`
        general(ApisearchmoviesUrl)
    }
    //#endregion
    //#region -----------------------------start movies

    // $('.cardmovie').hover(function() {
    // $('.fixedmovie').toggle()
    // $('.fixedmovie').removeClass('d-none').addClass('d-flex')
    // $('.fixedmovie').switchClass('d-none', 'd-flex', function() {
    //     $('.fixedmovie').slideUp('1000')
    // })
    // })

    // ---------  hide & show layer on movie card
    // bad    
    // i cant hande hide and show layer with each card movie 
    //  f i apply my code with only one card  >>its okay ut afer calling api and showing it >>my code not work 
    $('.fixedmovie').hide()
    $('.cardmovie').hover(function() {
        console.log(this);
        // alert('33333')
        $('.fixedmovie').fadeIn(1000)
    })
    $('.fixedmovie').mouseleave(function() {
        $('.fixedmovie').hide(1000)
    })
    $('.fixedmovie').hide()

    //#endregion
})