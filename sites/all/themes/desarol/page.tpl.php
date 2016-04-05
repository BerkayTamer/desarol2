





<?php print render($page['header']); ?>


<?php if ($main_menu): ?>
    <?php print theme('links__system_main_menu', array('links' => $main_menu, 'attributes' => array('id' => 'main-menu', 'class' => array('links', 'inline', 'clearfix')), 'heading' => t('Main menu'))); ?>
<?php endif; ?>

<?php print $messages; ?>

<?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
<?php if ($tabs): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>

<?php print render($page['content']); ?>

<?php print render($page['footer']); ?>
