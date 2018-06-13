'use strict';(function(window, $, Routing, swal) {    class ChalSpListApp {        constructor($wrapper, name, logs, points)        {            this.$wrapper = $wrapper;            this.dataName = name;            this.logs = logs;            this.points = points;            this.$wrapper.on(                'click',                '.js-delete-chalsp',                this.handleChalSpDelete.bind(this)            );            this.$wrapper.on(                'click',                '.js-show-detail',                this.handleChalSpDetail.bind(this)            );        }        handleChalSpDetail(e){            e.preventDefault();            let $span = $(e.currentTarget)[0];            let id = $span.dataset.id;            let name = $span.dataset.name;            let detail = $span.dataset.detail;            let compNum = this.logs[id] !== undefined ? this.logs[id] : 0;            let $points = "";            if(this.points)                $points = '<h3 style="color: Gray"><i> ( ' + $span.dataset.pts + ' pts ) </i></h3>';            let $img = $($span).find('img:first').attr('src');            swal({                html:                '<div>' +                    '<div style="padding-right: 15px; padding-left: 15px; padding-top: 15px">' +                        '<img src="' + $img + '" class="img-rounded pull-left" width="350" height="350"' +                            'style="border-radius: 25px; margin-right: 25px; margin-bottom: 15px; background-color: #EEEEEE"' +                '            onerror="imageError(this)">' +                        '<h1 style="display: inline"><strong>' + name + '</strong></h1>' +                        $points +                        '<h3 style="text-align: left; margin-bottom: 40px">' + detail + '</h3>' +                        '<h4 style="text-align: right">So Far Completed<strong> ' + compNum + ' </strong>Times!</h4>' +                    '</div>' +                '</div>',                width: '70%',                showConfirmButton: false,            });            $('.swal2-container').attr("onclick", 'swal.closeModal();');            $('.swal2-header').remove();        }        handleChalSpDelete(e) {            e.preventDefault();            const $link = $(e.currentTarget);            const entity = this.dataName;            const preConf = this._deleteChalSp.bind(null, $link);            deleteSwal(entity, preConf);        }        _deleteChalSp($link) {            $link.addClass('text-danger');            $link.find('.fa')                .removeClass('fa-trash')                .addClass('fa-spinner')                .addClass('fa-spin');            const deleteUrl = $link.data('url');            const $chalSp = $link.closest('div');            console.log(deleteUrl);            return $.ajax({                url: deleteUrl,                method: 'POST'            }).then(() => {                $chalSp.fadeOut('normal');            })        }    }    window.ChalSpListApp = ChalSpListApp;})(window, jQuery, Routing, swal);