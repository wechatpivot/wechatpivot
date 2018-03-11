import $ready from 'vanilla.js/jquery/ready.js';
import $find from 'vanilla.js/jquery/find.js';
import $on from 'vanilla.js/jquery/on.js';
import $attr from 'vanilla.js/jquery/attr.js';
import $addClass from 'vanilla.js/jquery/addClass.js';
import $removeClass from 'vanilla.js/jquery/removeClass.js';
import $post from 'vanilla.js/fetch/post';
import './style.scss';


$ready(function () {
  const $login = $find('.Login');
  const $redirect = $find('.Redirect');

  $on('.js-login', 'click', function () {
    const username = $find('[name="username"]').value;
    const code = $find('[name="code"]').value;
    const command = { username, code };

    $post('/api/login', command).then((...args) => {
      console.log(args);
    });

    $addClass($login, 'hidden');
    $removeClass($redirect, 'hidden');
  });
});
