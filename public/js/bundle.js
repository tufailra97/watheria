!function(e){var s={};function n(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=s,n.d=function(e,s,t){n.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:t})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(s,"a",s),s},n.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},n.p="",n(n.s=0)}([function(e,s){$(document).ready(()=>{$("#form").submit(e=>{e.preventDefault();let s=$("#input_city").val(),n=$("#input_country").val(),t=!1,r=[];if(s.trim()<1&&(t=!0,r.push("City name is not valid")),n.trim()<1&&(t=!0,r.push("Country name is not valid")),!0===t)displayErrors(r),r.length=0;else{$("#errors").hide();let e="http://api.openweathermap.org/data/2.5/weather?q="+s+","+n+"&APPID="+"63cc671f5fd5f6b9f6732ed8344316e1";$.ajax(e).done(e=>{console.log(e),displayResults(e)}).fail(e=>{let s=e.responseJSON.message;r.push(s),displayErrors(r),r.length=0})}}),displayErrors=(e=>{$("#results").length&&$("#results").children().remove(),$("#results").hide().append(e.map(e=>$('<li class="error">'+e+"!</li>"))).slideDown("slow")}),displayResults=(e=>{let s=e.weather[0].main,n=precisionRound(e.main.temp-273.15),t=precisionRound(e.main.temp_min-273.15),r=precisionRound(e.main.temp_max-273.15),l=e.wind.speed,a=new Date,i=a.toDateString(),p=a.toLocaleTimeString();$("#results").length&&$("#results").children().remove(),$('<li class="result"><span>Condition :</span> '+s+"</li>").appendTo("#results"),$('<li class="result"><span>Temperature : </span> '+n+"&#8451;</li>").appendTo("#results"),$('<li class="result"><span>Min Temp : </span> '+t+"&#8451</li>").appendTo("#results"),$('<li class="result"><span>Max Temp : </span> '+r+"</li>").appendTo("#results"),$('<li class="result"><span>Wind Speed : </span> '+l+" mph</li>").appendTo("#results"),$('<li class="result"><span>Time : </span> '+p+"</li>").appendTo("#results"),$('<li class="result"><span>Date : </span> '+i+"</li>").appendTo("#results"),$("#results").hide().slideDown("slow")}),precisionRound=(e=>{let s=Math.pow(10,2);return Math.round(e*s)/s})})}]);