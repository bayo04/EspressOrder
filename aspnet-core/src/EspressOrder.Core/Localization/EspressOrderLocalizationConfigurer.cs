using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace EspressOrder.Localization
{
    public static class EspressOrderLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(EspressOrderConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(EspressOrderLocalizationConfigurer).GetAssembly(),
                        "EspressOrder.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
