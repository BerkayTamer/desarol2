


<div class="feature">

    <div class="feature__transparent">

        <div class="feature__title">Code yourself a new future</div>

        <div class="feature__title-description">Become a web developer with the tech industry's first immersive coding school.</div>

        <a class="feature__button" href="/">Start an application</a>

    </div>

</div>




<?php print render($page['header']); ?>


<?php if ($main_menu): ?>
    <?php print theme('links__system_main_menu', array('links' => $main_menu, 'attributes' => array('id' => 'main-menu', 'class' => array('links', 'inline', 'clearfix')), 'heading' => t('Main menu'))); ?>
<?php endif; ?>

<?php print $messages; ?>

<?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
<?php if ($tabs): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>

<?php print render($page['content']); ?>

<?php print render($page['footer']); ?>
